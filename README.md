# Skins 2.0 - Sports Social Betting Platform

A cross-platform application for friendly sports wagering among groups, focusing on PGA and NHL events.

## Tech Stack

- **Frontend Mobile**: React Native
- **Frontend Web**: React
- **Backend**: Supabase
- **UI Framework**: Material UI
- **Authentication**: Supabase Auth
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation

## Features

- Multi-platform support (iOS, Android, Web)
- Email-based authentication with verification
- Group management with invite system
- PGA Tournament support with player selection and skins scoring
- NHL Game support with player selection and goal scoring
- Virtual currency system with automated skin value calculation
- Push notifications for game events and group activities
- Real-time updates using Supabase subscriptions

## Project Structure

```
skins2.0/
├── mobile/              # React Native mobile app
├── web/                 # React web app
├── shared/              # Shared code between platforms
│   ├── api/            # API integration
│   ├── components/     # Common UI components
│   ├── store/         # Redux store configuration
│   └── types/         # TypeScript type definitions
└── supabase/           # Supabase configuration and migrations
```

## Prerequisites

- Node.js >= 18
- npm >= 9
- React Native development environment setup
- Supabase account
- Xcode (for iOS development)
- Android Studio (for Android development)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/skins2.0.git
cd skins2.0
```

2. Install dependencies:
```bash
# Install web dependencies
cd web
npm install

# Install mobile dependencies
cd ../mobile
npm install
```

3. Set up environment variables:
Create `.env` files in both web and mobile directories with the following variables:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development servers:

For web:
```bash
cd web
npm start
```

For mobile:
```bash
cd mobile
npm run ios     # For iOS
npm run android # For Android
```

## Development Guidelines

- Follow the established folder structure
- Use TypeScript for type safety
- Implement responsive design using Material UI components
- Follow Redux Toolkit patterns for state management
- Write unit tests for critical functionality
- Use ESLint and Prettier for code formatting

## API Integration

The application integrates with:
- NHL public API for hockey data
- ESPN API for golf data
- Supabase for backend services

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details
