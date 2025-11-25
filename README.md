# TinyLink (Take-home)

Simple URL shortener built with Next.js + Prisma + Postgres (Neon).

Assignment PDF included at `docs/Take-Home Assignment_ TinyLink (1) (2).pdf`.

## Local setup

1. Install Node.js (>=18).
2. Clone repo and `cd tinylink_full`.
3. `npm install`
4. Copy `.env.example` to `.env` and set:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```
5. Run Prisma migrations:
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```
6. Start dev server:
   ```
   npm run dev
   ```
7. Open: `http://localhost:3000`

## What to submit
- Live URL (Vercel)
- GitHub repo
- Video walkthrough
- ChatGPT transcript

