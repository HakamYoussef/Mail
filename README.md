# Mail Workspace Starter

This project bootstraps a Next.js App Router workspace with TypeScript, Tailwind CSS, Chakra UI, NextAuth, and Prisma. It includes a workspace-aware session model, relational schema for mail and docs, migrations, and a protected dashboard layout.

## Getting started

1. Install dependencies (Node.js 18+ recommended):
   ```bash
   npm install
   # or pnpm install
   ```
2. Configure environment variables via `.env` (see `.env.example`).
3. Generate the Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Seed the database:
   ```bash
   npx prisma db seed
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```

## Notes
- NextAuth is configured for Google and Microsoft Entra ID OAuth providers.
- Middleware protects application routes, redirecting unauthenticated visitors to `/signin`.
- The Prisma schema models workspaces, membership roles, invitations, email threads/messages, docs, comments, and notifications.
- Tailwind is available alongside Chakra UI; the UI uses Chakra primitives with Tailwind globals.
