# EcoPup AI - Carbon Footprint Tracker

## Overview

EcoPup AI is an AI-powered sustainability assistant designed to help users understand the environmental impact of their daily choices. By combining carbon footprint tracking, AI-driven meal analysis, transport impact assessment, and gamified progress tracking, EcoPup encourages users to build more sustainable habits in an engaging and accessible way.

Users interact with EcoPup, a virtual sustainability companion that provides personalized insights, recommendations, and progress tracking throughout their environmental journey.

---

## Challenge Vertical

**Sustainability & Climate Awareness**

EcoPup AI focuses on promoting environmentally conscious decision-making by helping users evaluate the impact of their food and transportation choices.

---

## Problem Statement

Many individuals want to adopt sustainable habits but lack visibility into how their everyday actions affect the environment.

Traditional carbon calculators are often static, difficult to use regularly, and provide little motivation for long-term engagement.

EcoPup AI addresses these challenges by making sustainability tracking:

* Interactive
* Personalized
* Educational
* Gamified
* AI-powered

---

## Solution

EcoPup AI provides users with a simple and engaging way to track and improve their sustainability habits.

### Meal Impact Analysis

Users can enter meals and receive:

* AI-generated sustainability scores
* Estimated carbon footprint
* Eco-friendly recommendations
* Alternative meal suggestions

### Transport Impact Analysis

Users can track transportation methods including:

* Walking
* Cycling
* Metro
* Bus
* Car
* Flight

and receive environmental impact insights based on their selections.

### Personalized Dashboard

The dashboard allows users to monitor:

* Total carbon footprint
* Average eco score
* Meals logged
* Transportation activities
* Sustainability streaks
* Recent activity history

### Badges & Achievements

Users unlock achievement badges by consistently making environmentally responsible choices. Interactive badge cards explain the impact behind each achievement.

### Personalized Experience

EcoPup remembers user preferences locally and provides a customized sustainability journey with streak tracking and progress monitoring.

---

## AI Integration

EcoPup AI uses **Google Gemini 2.5 Flash** to analyze meal inputs and generate sustainability insights.

### AI Workflow

User Input

↓

React Frontend

↓

Express Backend API

↓

Google Gemini 2.5 Flash

↓

Eco Score + Carbon Estimate + Recommendations

↓

Impact Card Display

### Fallback System

To ensure reliability, EcoPup includes a rule-based fallback engine that automatically provides analysis when AI services are unavailable.

---

## System Architecture

Frontend (React + Vite)

↓

REST API (Express.js)

↓

Google Gemini API

↓

Response Processing Layer

↓

Dashboard & Progress Tracking

The frontend handles user interactions, visualizations, state management, and local persistence. The backend manages AI communication, response processing, and fallback logic before returning structured sustainability insights.

---

## Features

* AI-powered meal analysis
* Carbon footprint estimation
* Transport impact tracking
* Personalized dashboard
* Sustainability streak tracking
* Achievement badges
* Impact analytics
* Shareable sustainability summaries
* Responsive user interface
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

## How It Works

1. Users enter their name to personalize the experience.
2. EcoPup creates a customized sustainability profile.
3. Users analyze meals or transportation choices.
4. AI generates environmental insights and recommendations.
5. Activities are stored locally and tracked over time.
6. The dashboard updates automatically.
7. Users unlock achievements and monitor their progress.

---

## Testing

### Manual Testing Performed

The following workflows were manually tested:

* User onboarding and personalization
* Meal impact analysis
* Gemini AI integration
* AI fallback functionality
* Transport impact analysis
* Dashboard calculations
* Badge unlocking system
* Activity logging
* Local storage persistence
* Share functionality
* Frontend deployment
* Backend deployment

All primary user journeys were validated on the deployed application.

### Automated Testing

EcoPup AI includes automated frontend testing using Vitest. Current test coverage includes:

* App initialization
* Meal module functionality
* Transport module functionality


Run tests locally: npm test

---

## Accessibility

EcoPup AI was designed with usability and accessibility in mind through:

* Clear visual hierarchy
* High-contrast interface elements
* Descriptive form labels
* Responsive layouts
* Keyboard-accessible controls
* Large interactive touch targets
* Consistent navigation patterns
* Readable content structure

Future improvements include enhanced keyboard navigation, ARIA support, and screen-reader optimization.

---

## Security Considerations

* API keys are stored using environment variables.
* Sensitive credentials are excluded from source control.
* A `.env.example` file is provided for secure configuration.
* HTTP security headers are enabled using Helmet.
* Input validation is performed before processing AI requests.
* Sensitive credentials are excluded from source control.
* User activity is stored locally in the browser.
* Only the information required for meal analysis is sent to the AI service.

---

## Assumptions

* Carbon footprint estimates are educational approximations.
* User data is stored locally using browser localStorage.
* AI-generated recommendations are intended for awareness and guidance.
* EcoPup AI is designed as an educational sustainability assistant rather than a scientific carbon accounting platform.

---

## Future Improvements

* User authentication
* Cloud-based data storage
* Advanced sustainability coaching
* Weekly sustainability reports
* Community challenges
* Expanded badge system
* More detailed carbon analytics
* Enhanced accessibility support

---

## Live Demo

Frontend: https://eco-pup-carbon-tracker.vercel.app/

Backend: https://ecopup-carbon-tracker.onrender.com

GitHub Repository:
https://github.com/msasan25/EcoPup-Carbon-Tracker

---

## Author

Developed as part of the Prompt Wars Virtual Challenge.

EcoPup AI combines artificial intelligence, sustainability awareness, and gamification to make environmentally conscious decision-making more accessible and engaging.
