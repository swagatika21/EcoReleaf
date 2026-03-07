# EcoReleaf

Full-stack EcoReleaf app with:
- `client`: React + Vite frontend
- `server`: Express + MongoDB backend

## What was revamped
- Centralized frontend API base URL via env (`VITE_API_BASE_URL`)
- Removed hardcoded backend URLs from nursery screens
- Moved OpenWeather API key usage to env (`VITE_OPENWEATHER_API_KEY`)
- Added backend health endpoint: `GET /api/health`
- Added safer backend startup with required `DB_URI` check and configurable `CORS_ORIGIN`
- Added root scripts to simplify install/run flows
- Added env examples for both client and server

## Prerequisites
- Node.js 18+ (includes npm)
- MongoDB Atlas (or local MongoDB URI)
- OpenWeather API key

## Setup
1. Create server env file:
   - Copy `server/.env.example` to `server/.env`
   - Fill real values
2. Create client env file:
   - Copy `client/.env.example` to `client/.env`
   - Fill real values

## Install dependencies
From repo root:

```bash
npm run install:all
```

Or install separately:

```bash
npm --prefix server ci
npm --prefix client ci
```

## Run locally (2 terminals)
Terminal 1 (backend):

```bash
npm run dev:server
```

Terminal 2 (frontend):

```bash
npm run dev:client
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5001`
Health check: `http://localhost:5001/api/health`
