# Gymple

Gym management system with memberships, payments, and client tracking.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma

## Project Structure

```text
Gymple/
├── docs/               # Project documentation
│   ├── back/          # Backend documentation
│   │   ├── db-model.md      # ER diagram (Mermaid)
│   │   ├── schema.sql       # PostgreSQL DDL reference
│   │   └── README.md
│   └── front/         # Frontend documentation (TODO)
│
├── Back/              # Express backend
│   ├── prisma/
│   │   └── schema.prisma    # Prisma ORM schema
│   ├── src/                 # Source code (TODO)
│   └── package.json
│
└── Front/             # Next.js frontend (TODO)
```

## Getting Started

### Backend Setup

1. Install dependencies:

   ```bash
   cd Back
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env and add your DATABASE_URL
   ```

3. Run Prisma migrations:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

### Frontend Setup

(TODO)

## Documentation

- Database model visualization: `docs/back/db-model.md` (view with Mermaid extension)
- Database schema reference: `docs/back/schema.sql`
