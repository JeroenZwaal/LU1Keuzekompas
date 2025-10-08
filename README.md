# LU1 Keuzekompas - Full Stack Application

Deze repository bevat een volledig full-stack applicatie voor het LU1 Keuzekompas project, bestaande uit:

- **Frontend**: Angular applicatie (poort 4200)
- **Backend**: NestJS API (poort 3000)

## 🚀 Quick Start

### Optie 1: Automatische Start (Aanbevolen)

**Windows Command Prompt:**
```cmd
start.bat
```

**PowerShell:**
```powershell
.\start.ps1
```

**NPM (alle platformen):**
```bash
npm run install:all
npm start
```

### Optie 2: Handmatige Start

1. **Dependencies installeren:**
```bash
# Root dependencies
npm install

# Backend dependencies  
cd Backend/api-keuze-kompass-lu1
npm install
cd ../..

# Frontend dependencies
cd Frontend/ClientKeuzeKompassLU1  
npm install
cd ../..
```

2. **Beide applicaties starten:**
```bash
npm start
```

## 📂 Project Structuur

```
LU1Keuzekompas/
├── Backend/
│   └── api-keuze-kompass-lu1/          # NestJS API
├── Frontend/
│   └── ClientKeuzeKompassLU1/          # Angular App
├── package.json                        # Root package met scripts
├── start.bat                          # Windows batch script
├── start.ps1                          # PowerShell script
└── README.md                          # Dit bestand
```

## 🛠️ Beschikbare Scripts

| Script | Beschrijving |
|--------|-------------|
| `npm start` | Start beide applicaties in development mode |
| `npm run start:backend` | Start alleen de backend |
| `npm run start:frontend` | Start alleen de frontend |
| `npm run install:all` | Installeer alle dependencies |
| `npm run build:all` | Build beide applicaties |

## 🌐 URLs

- **Frontend (Angular)**: http://localhost:4200
- **Backend (NestJS)**: http://localhost:3000

## 📋 Vereisten

- Node.js (versie 16 of hoger)
- NPM (meestal meegeleverd met Node.js)

## 🔧 Development

### Alleen Backend Starten
```bash
cd Backend/api-keuze-kompass-lu1
npm run start:dev
```

### Alleen Frontend Starten  
```bash
cd Frontend/ClientKeuzeKompassLU1
npm start
```

## 🛑 Stoppen

Druk `Ctrl+C` in de terminal om beide applicaties te stoppen.

## 📝 Notities

- De backend draait op poort 3000
- De frontend draait op poort 4200  
- Beide applicaties starten automatisch in development/watch mode
- Wijzigingen worden automatisch herladen