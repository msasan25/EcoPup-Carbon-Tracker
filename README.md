# EcoPup AI - Carbon Footprint Tracker

## Overview

EcoPup AI is an interactive sustainability assistant designed to help users understand and reduce their environmental impact through everyday choices.

The application combines carbon footprint tracking, AI-powered meal analysis, transport impact assessment, achievement badges, and personalized progress tracking to encourage environmentally conscious behavior.

Users interact with EcoPup, a friendly virtual companion that guides them through tracking their activities and understanding their environmental footprint.

---

## Chosen Vertical

**Sustainability & Climate Awareness**

EcoPup AI focuses on helping individuals make informed decisions about food consumption and transportation by providing personalized environmental insights and actionable recommendations.

---

## Problem Statement

Many people want to live more sustainably but struggle to understand how their daily choices impact the environment.

Existing carbon calculators are often complex, static, or difficult to engage with regularly.

EcoPup AI addresses this by making sustainability tracking:

* Interactive
* Personalized
* Educational
* Gamified
* AI-powered

---

## Solution

EcoPup AI acts as a sustainability assistant that allows users to:

### Meal Impact Analysis

Users can enter meals and receive:

* AI-generated eco score
* Estimated carbon footprint
* Sustainability recommendations
* Alternative eco-friendly choices

### Transport Impact Analysis

Users can track transportation methods such as:

* Walking
* Cycling
* Metro
* Bus
* Car
* Flight

and receive corresponding carbon impact information.

### Impact Dashboard

Users can monitor:

* Total CO₂ footprint
* Average eco score
* Meals logged
* Trips logged
* Recent activity

### Badges & Achievements

Users unlock badges based on their sustainable actions and can interact with achievement cards to learn why they earned them.

### Personalized Experience

EcoPup remembers the user's name, tracks streaks, and provides a customized sustainability journey.

---

## AI Integration

EcoPup AI uses **Google Gemini 2.5 Flash** to analyze user-entered meals.

### AI Workflow

User Input

↓

Frontend (React)

↓

Backend API (Node.js + Express)

↓

Google Gemini API

↓

Eco Score + Carbon Estimate + Recommendations

↓

Impact Card

### Fallback System

If the AI service is unavailable, EcoPup automatically falls back to a rule-based analysis engine to ensure uninterrupted functionality.

---

## Features

* AI-powered meal analysis
* Carbon footprint estimation
* Transport impact tracking
* Personalized dashboard
* Impact summary analytics
* Achievement badges
* Progress tracking
* Daily streak system
* Shareable impact reports
* Responsive design
* EcoPup interactive mascot
* AI fallback support

---

## Tech Stack

### Frontend

* React
* React Router
* Vite
* JavaScript

### Backend

* Node.js
* Express.js
* CORS

### AI

* Google Gemini 2.5 Flash

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

```text
EcoPup-Carbon-Tracker/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.jsx

backend/
├── server.js
├── package.json
└── .env
```

## How It Works

1. User enters their name.
2. EcoPup personalizes the experience.
3. User analyzes meals or transportation choices.
4. AI generates sustainability insights.
5. Activities are logged locally.
6. Dashboard updates automatically.
7. Users unlock badges and improve their sustainability profile.

---

## Assumptions

* Carbon footprint estimates are educational approximations.
* User data is stored locally in the browser using localStorage.
* AI-generated recommendations are intended for awareness and guidance purposes.
* The application is designed as an educational sustainability assistant rather than a scientific carbon accounting tool.

---

## Future Improvements

* User authentication
* Cloud-based data storage
* Expanded AI sustainability coaching
* More achievement categories
* Community challenges
* Weekly sustainability reports
* Advanced carbon analytics
* Social sharing cards

---

## Security Considerations

* API keys are stored securely using environment variables.
* Sensitive credentials are excluded from source control.
* No personal user data is transmitted beyond the required AI analysis request.

---

## Author

Developed as part of an AI-powered sustainability challenge submission.

EcoPup AI aims to make sustainability tracking engaging, accessible, and actionable through the combination of environmental awareness and artificial intelligence.
