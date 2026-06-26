# 🌤️ AERO WEATHER

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/aero-weather)
[![GitHub license](https://img.shields.io/github/license/yourusername/aero-weather)](https://github.com/yourusername/aero-weather/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/aero-weather)](https://github.com/yourusername/aero-weather/stargazers)

> A modern, beautiful weather application with real-time data, 7-day forecast, premium features, and user authentication.

![AERO Weather Dashboard](https://via.placeholder.com/800x400.png?text=AERO+Weather+Dashboard)

---
aero-weather/
├── src/
│   ├── components/
│   │   ├── Auth/              # Authentication components
│   │   ├── Weather/           # Weather display components
│   │   └── Common/            # Reusable components
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication context
│   │   └── WeatherContext.jsx # Weather context
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   ├── Dashboard.jsx      # Main weather dashboard
│   │   └── Auth.jsx           # Login/Signup page
│   ├── utils/
│   │   ├── weatherApi.js      # API calls
│   │   └── localStorage.js    # Local storage utilities
│   ├── firebase/
│   │   └── config.js          # Firebase configuration
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md

## ✨ Features

### 🌤️ Free Features (No Login Required)
- ✅ **Real-Time Weather** - Live weather data for any city
- ✅ **7-Day Forecast** - Daily weather predictions
- ✅ **Hourly Forecast** - Next 24 hours breakdown
- ✅ **Dynamic Backgrounds** - Weather-based gradients
- ✅ **Unit Toggle** - Celsius / Fahrenheit
- ✅ **Location Detection** - Auto-detect your city

### ⭐ Premium Features (Login Required)
- ❤️ **Favorites** - Save unlimited cities
- 💧 **Skin & Hair Care Tips** - Weather-based beauty advice
- 🎯 **Weather Score** - AI-powered comfort rating (0-100)
- 🌅 **Best Time to Go Out** - Optimal outdoor timing
- ⚡ **Weather Fun Facts** - Daily interesting facts
- 📊 **Recent Searches** - History of your searches
- 🔒 **Cloud Sync** - Your data across devices

---

## 🛠️ Tech Stack

| Category | Technology |
|:---|:---|
| **Frontend** | React 18, Vite |
| **Styling** | Tailwind CSS, CSS Animations |
| **Routing** | React Router v6 |
| **State Management** | Context API |
| **Authentication** | Firebase Auth |
| **API** | OpenWeatherMap API |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API Key
- Firebase Account (for authentication)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/aero-weather.git
cd aero-weather

# Install dependencies
npm install

# Create .env file with your keys
cp .env.example .env

# Start development server
npm run dev