export interface User {
  id: string;
  email: string;
  screenName: string;
  phoneNumber?: string;
  notificationPreferences: NotificationPreferences;
  currentBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  gameStarts: boolean;
  playerScoring: boolean;
  settlementRequests: boolean;
  groupChat: boolean;
  updateFrequency: 'realtime' | 'hourly' | 'daily';
}

export interface Group {
  id: string;
  name: string;
  adminId: string;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  joinedAt: string;
}

export interface Event {
  id: string;
  type: 'PGA' | 'NHL';
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'live' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Wager {
  id: string;
  eventId: string;
  groupId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'settled';
  createdAt: string;
  updatedAt: string;
}

export interface PlayerSelection {
  id: string;
  eventId: string;
  userId: string;
  playerId: string;
  round?: number; // For PGA tournaments
  createdAt: string;
}

export interface Skin {
  id: string;
  eventId: string;
  playerId: string;
  userId: string;
  value: number;
  type: 'goal' | 'stroke' | 'holeinone';
  createdAt: string;
}
