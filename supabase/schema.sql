-- Create custom types
CREATE TYPE event_type AS ENUM ('PGA', 'NHL');
CREATE TYPE event_status AS ENUM ('upcoming', 'live', 'completed');
CREATE TYPE wager_status AS ENUM ('pending', 'settled');
CREATE TYPE skin_type AS ENUM ('goal', 'stroke', 'holeinone');
CREATE TYPE notification_frequency AS ENUM ('realtime', 'hourly', 'daily');

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users PRIMARY KEY,
    screen_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20),
    current_balance DECIMAL(10,2) DEFAULT 0.00,
    notification_game_starts BOOLEAN DEFAULT true,
    notification_player_scoring BOOLEAN DEFAULT true,
    notification_settlement_requests BOOLEAN DEFAULT true,
    notification_group_chat BOOLEAN DEFAULT true,
    notification_frequency notification_frequency DEFAULT 'realtime',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create groups table
CREATE TABLE public.groups (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    admin_id UUID REFERENCES public.users(id) NOT NULL,
    invite_code VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create group_members table
CREATE TABLE public.group_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(group_id, user_id)
);

-- Create events table
CREATE TABLE public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type event_type NOT NULL,
    name VARCHAR(200) NOT NULL,
    external_id VARCHAR(100),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status event_status DEFAULT 'upcoming',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create wagers table
CREATE TABLE public.wagers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status wager_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create player_selections table
CREATE TABLE public.player_selections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    player_id VARCHAR(100) NOT NULL,
    round INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create skins table
CREATE TABLE public.skins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    player_id VARCHAR(100) NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    value DECIMAL(10,2) NOT NULL,
    type skin_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create RLS policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wagers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skins ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE
    USING (auth.uid() = id);

-- Group members can read group data
CREATE POLICY "Group members can read group data" ON public.groups
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.group_members
            WHERE group_members.group_id = groups.id
            AND group_members.user_id = auth.uid()
        )
    );

-- Group admins can update group data
CREATE POLICY "Group admins can update group data" ON public.groups
    FOR UPDATE
    USING (admin_id = auth.uid());

-- Users can read their group memberships
CREATE POLICY "Users can read own group memberships" ON public.group_members
    FOR SELECT
    USING (user_id = auth.uid());

-- All authenticated users can read events
CREATE POLICY "Authenticated users can read events" ON public.events
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Users can read their own wagers
CREATE POLICY "Users can read own wagers" ON public.wagers
    FOR SELECT
    USING (user_id = auth.uid());

-- Users can read their own player selections
CREATE POLICY "Users can read own player selections" ON public.player_selections
    FOR SELECT
    USING (user_id = auth.uid());

-- Group members can read skins in their groups
CREATE POLICY "Group members can read skins" ON public.skins
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.wagers w
            JOIN public.group_members gm ON w.group_id = gm.group_id
            WHERE w.event_id = skins.event_id
            AND gm.user_id = auth.uid()
        )
    );

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at
    BEFORE UPDATE ON public.groups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wagers_updated_at
    BEFORE UPDATE ON public.wagers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
