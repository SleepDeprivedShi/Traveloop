# Traveloop

Personalized Travel Planning Made Easy

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Charts:** Recharts

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/      # Reusable UI components
├── lib/             # Firebase hooks & utilities
├── context/         # React Context providers
└── public/          # Static assets
```

## Firebase Setup

1. Create project at [firebase.google.com](https://firebase.google.com)
2. Enable **Authentication** (Email/Password)
3. Enable **Firestore Database**
4. Enable **Storage**
5. Copy config to `lib/firebase.ts`

## Features

- [x] User authentication (login/signup)
- [ ] Dashboard with trips overview
- [ ] Create & manage trips
- [ ] Itinerary builder with city stops
- [ ] Activity search & add
- [ ] Budget tracking
- [ ] Packing checklist
- [ ] Trip notes
- [ ] Share public itinerary
- [ ] User profile settings

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## Team

- **Person A:** Frontend & UI
- **Person B:** Auth & Firebase Setup