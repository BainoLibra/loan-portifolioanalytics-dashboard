# Loan Portfolio Analytics Dashboard

## Overview
A loan portfolio analytics dashboard with a backend-first architecture.

## Technologies
- Backend: Node.js, Express.js, MySQL
- Frontend: React, Vite, Material UI, Recharts (planned)

## Roles
- Admin
- Branch Manager
- Loan Officer
- Auditor

## Backend features implemented
- JWT authentication (`POST /api/auth/login`)
- Role-based access control for dashboard endpoints
- Analytics endpoints:
  - `GET /api/dashboard/summary`
  - `GET /api/dashboard/defaulting-clients`
  - `GET /api/dashboard/top-officers`
  - `GET /api/dashboard/branch-growth`
  - `GET /api/dashboard/par`

## Database
- `db/schema.sql` defines tables for roles, branches, officers, clients, loans, repayments, schedules, and users.

## Getting started
1. Open `backend/.env.example` and copy to `.env`.
2. Add your MySQL connection details and `JWT_SECRET`.
3. Run from `backend`:
   - `npm install`
   - `npm run dev`
4. Use `POST /api/auth/login` to obtain a token before calling dashboard APIs.

