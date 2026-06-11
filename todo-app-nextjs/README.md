# Todo App

A minimal full-stack todo app built with Next.js, TypeScript, Tailwind CSS, and NeonDB.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **NeonDB** (serverless Postgres)

## Setup

### 1. Get your NeonDB connection string

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the **connection string** from the dashboard (looks like `postgresql://user:pass@host.neon.tech/dbname?sslmode=require`)

### 2. Configure environment

Rename `.env.local` (already created) and paste your connection string:

```env
DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname?sslmode=require
```

### 3. Install & run

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

The database table is **auto-created** on first request — no migration needed.

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/todos` | Fetch all todos |
| POST | `/api/todos` | Create a todo `{ title }` |
| PATCH | `/api/todos/:id` | Toggle complete `{ completed }` |
| DELETE | `/api/todos/:id` | Delete a todo |

## Project Structure

```
app/
  api/
    todos/
      route.ts          # GET, POST
      [id]/route.ts     # PATCH, DELETE
  page.tsx              # UI
  layout.tsx
  globals.css
lib/
  db.ts                 # NeonDB queries
.env.local              # DATABASE_URL goes here
```
