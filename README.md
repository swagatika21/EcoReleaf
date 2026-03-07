# 🌿 EcoReleaf

> *Plant today. Breathe tomorrow.*

EcoReleaf is a full-stack web application helping people combat air pollution by connecting contributors with local nurseries, providing real-time Air Quality Index data, and delivering personalised plant recommendations.

---

## ✨ Features

- 🌫️ **Live AQI Dashboard** — Real-time air quality data powered by OpenWeather API
- 🌱 **Plant Recommendations** — Personalised suggestions based on local air quality
- 🏡 **Nursery Discovery** — Find verified nurseries sorted by distance from your location
- 📋 **Pollution History** — Track and visualise AQI snapshots over time
- 💚 **Wishlist** — Save plants you want to grow
- 🌐 **Multilingual** — English, Hindi, and Odia support
- 🔐 **Auth** — Separate flows for Contributors and Nursery Owners

---

## 🗂️ Project Structure

```
ecoreleaf/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── Styles/
│   │   ├── language/   # i18n plant data (EN, HI, OD)
│   │   └── utils/
│   └── .env.example
├── server/          # Express + MongoDB backend
│   ├── routes/
│   ├── models/
│   └── .env.example
└── package.json     # Root scripts
```

---

## ⚙️ Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| npm | 9+ (bundled with Node 18) |
| MongoDB | Atlas or local instance |
| OpenWeather API key | [Get one free](https://openweathermap.org/api) |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecoreleaf.git
cd ecoreleaf
```

### 2. Configure environment variables

**Server:**
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
DB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ecoreleaf
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:5173
PORT=5001
```

**Client:**
```bash
cp client/.env.example client/.env
```

Edit `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5001
VITE_OPENWEATHER_API_KEY=your_openweather_key_here
```

### 3. Install dependencies

From the repo root:
```bash
npm run install:all
```

Or separately:
```bash
npm --prefix server ci
npm --prefix client ci
```

### 4. Run locally

Open two terminals:

```bash
# Terminal 1 — Backend
npm run dev:server

# Terminal 2 — Frontend
npm run dev:client
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5001 |
| Health check | http://localhost:5001/api/health |

---

## 🛠️ Available Scripts

Run these from the **repo root**:

| Script | Description |
|--------|-------------|
| `npm run install:all` | Install all client and server dependencies |
| `npm run dev:client` | Start the Vite dev server |
| `npm run dev:server` | Start the Express server with nodemon |

---

## 🔌 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/login` | Log in |
| `GET` | `/api/nurseries` | List all nurseries |
| `GET` | `/api/nurseries/:id` | Get nursery details |

---

## 🌍 Environment Variables Reference

### `server/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `DB_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret for signing JWT tokens |
| `CORS_ORIGIN` | ✅ | Allowed frontend origin |
| `PORT` | ❌ | Server port (default: `5001`) |

### `client/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | ✅ | Backend base URL |
| `VITE_OPENWEATHER_API_KEY` | ✅ | OpenWeather API key |

---

## 🔒 Security Notes

- **Never commit `.env` files.** Both are listed in `.gitignore`.
- If credentials were previously committed, **rotate them immediately** — especially `DB_URI` and `JWT_SECRET` — before any deployment.
- The server will refuse to start if `DB_URI` is missing.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

# Made with 💚 for the planet · Bhubaneswar, India