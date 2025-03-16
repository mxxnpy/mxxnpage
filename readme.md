# Personal Status Dashboard

A full-stack TypeScript application inspired by ven.earth to display real-time activity and status information.

## Tech Stack

- **Backend**: NestJS
- **Frontend**: Angular with Material UI
- **Language**: TypeScript

## Features

- Clock and weather display for São Paulo
- GitHub activity feed for user 'mxxnpy'
- Discord presence with activity mapping
- Spotify current track display
- Project page
- Light/dark theme toggle
- Social media links
- Minimal design matching ven.earth aesthetic
- Swagger UI documentation

## Project Structure

```
personal-status-dashboard/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── api/             # API modules
│   │   │   ├── discord/     # Discord integration
│   │   │   ├── github/      # GitHub integration
│   │   │   ├── spotify/     # Spotify integration
│   │   │   ├── status/      # Status endpoints
│   │   │   └── weather/     # Weather integration
│   │   ├── config/          # Configuration
│   │   ├── interfaces/      # TypeScript interfaces
│   │   ├── services/        # Shared services
│   │   ├── utils/           # Utility functions
│   │   ├── app.module.ts    # Main application module
│   │   └── main.ts          # Application entry point
│   ├── .env                 # Environment variables
│   └── package.json         # Dependencies
│
├── frontend/                # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Reusable components
│   │   │   ├── pages/       # Page components
│   │   │   │   ├── home/    # Home page
│   │   │   │   └── projects/# Projects page
│   │   │   ├── services/    # Angular services
│   │   │   ├── interfaces/  # TypeScript interfaces
│   │   │   ├── utils/       # Utility functions
│   │   │   ├── app.component.ts  # Root component
│   │   │   └── app.routes.ts     # Routing configuration
│   │   ├── assets/          # Static assets
│   │   ├── environments/    # Environment configuration
│   │   └── styles.scss      # Global styles
│   └── package.json         # Dependencies
│
└── README.md                # Project documentation
```

## Development

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Setup

1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
4. Configure environment variables in `backend/.env`

### Running the Application

#### Development Mode

1. Start the backend:
   ```
   cd backend
   npm run start:dev
   ```

2. Start the frontend:
   ```
   cd frontend
   npm start
   ```

3. Access the application:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000/backend
   - Swagger Documentation: http://localhost:3000/backend/docs

## Schedule-based Status Updates

The application implements the following schedule for status updates:

- Weekdays (Monday-Friday):
  * 06:00-07:30: Free Time
  * 08:30-18:30: At Work
  * 19:00-00:00: Free Time
- Weekends: Free Time

## Discord Presence Mapping

- Gaming: when game is open
- Programming: when VSCode/IDE is open
- Chilling: when other programs or no activity
- With Friends: when in call
- Out of Home: when status is 'Ausente'
- Vibing: when Spotify is active (not in work time)
- At Work: when online during work hours
