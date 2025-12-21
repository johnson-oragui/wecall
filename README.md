### Description

## WeChat - Real-time Voice & Video Calls

A high-performance communication platform built with Next.js 15 and Django Channels. This project implements a secure "WebSocket Authority" pattern, ensuring that sensitive backend credentials never touch the client browser.

## Problem StatementStandard WebSocket implementations often struggle with Secure Authentication. Passing JWTs or API tokens via query strings in the browser is a security risk (logs, shoulder surfing), and browsers do not support custom headers for the native WebSocket API.

# WeChat solves this by:

- Eliminating browser-side authentication for WebSockets.
- Using the Next.js Server as a trusted middleware proxy.
- Enabling HttpOnly cookies for session management, keeping tokens strictly on the server.

## Tech Stack

```csv
Layer,Technology,Role
Frontend,Next.js 15 (App Router),UI & Secure Proxy Server
Backend,Django + Channels,Real-time Business Logic & State
Styling,Tailwind CSS,"Responsive, dark-mode UI"
Icons,Lucide React,Visual Indicators
Protocol,WebSockets (ws/wss),Bidirectional Communication
```

## Key Decisions

1. The "Authority" Proxy Pattern
   Unlike typical apps where the browser connects directly to Django, this architecture uses Next.js as an intermediary.
   - Browser → Next.js: A simple, unauthenticated local WebSocket connection.
   - Next.js → Django: The Next.js server reads the user's HttpOnly session cookie, validates it, and then opens a trusted connection to Django using a hidden JWT.
2. Unified Message Flow
   All communication is forwarded bi-directionally.
   - This allows for:Centralized Logging: Every packet can be logged on the Next.js server for debugging.
   - Message Transformation: Next.js can sanitize or modify messages before they hit the frontend or backend.
3. Automatic UI Synchronization
   The frontend uses useRef and useEffect hooks to handle complex DOM interactions (like auto-scrolling chat history) while maintaining strict TypeScript safety to prevent "hydration" errors common in SSR frameworks.

## How to Run It

# Prerequisites

Node.js 18+Python 3.10+Redis (for Django Channels layer)

1. Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

2. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

3. Production Build
   To ensure type safety and optimization:

```bash
npm run build
npm start
```

## High-level architecture

```
┌──────────────┐
│   Browser    │
│ (Next Client)│
│              │
│  WS (NO auth)│
└─────▲────────┘
      │
      │ WebSocket (internal)
      │
┌─────┴────────┐
│  Next.js     │  ← AUTHORITY
│  Server      │
│              │
│   Reads HttpOnly cookie
│   Opens Django/FastAPI WS w/ token
│   Forwards messages BOTH ways
└─────▲────────┘
      │
      │ WebSocket (?token=JWT)
      │
┌─────┴────────┐
│Django/FastAPI│
│ Channels     │
│              │
└──────────────┘

```

## Core principle

Browsers do NOT authenticate WebSockets. Servers do.
Client → Next.js
Next.js → Django/FastAPI WS (token injected server-side)

## Message flow (very important)

**Browser → Django/FastAPI (via Next)**

```
Browser WS msg
   ↓
Next.js WS handler
   ↓
Forward to Django/FastAPI WS
```

## Django/FastAPI → Browser (via Next)

```
Django/FastAPI WS msg
   ↓
Next.js WS handler
   ↓
Forward to Browser WS
```

