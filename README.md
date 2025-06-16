# Captain Sonar Monorepo

This repository contains the full-stack Captain Sonar project, organized as a monorepo with separate packages for the web client, server, and database.

## Getting Started

Install dependencies for all workspaces:

```bash
npm install
```

## Root Scripts

The following scripts are available at the root level to help manage the different packages:

- `npm run web:dev`: Start the web client in development mode.
- `npm run web:build`: Build the web client for production.
- `npm run web:start`: Start the production web server.
- `npm run server:dev`: Start the backend server in development mode.
- `npm run db:validate`: Validate the Prisma schema in the database package.
- `npm run db:generate`: Generate the Prisma client in the database package.
- `npm run db:push`: Push the Prisma schema to the database.
- `npm run db:pull`: Pull the database schema into the Prisma schema file.
- `npm run db:seed`: Seed the database with initial data.
- `npm run db:migrate-dev`: Apply database migrations in development mode.
- `npm run db:migrate-deploy`: Apply database migrations in production mode.
- `npm run db:migrate-create-only`: Create migration files only, without applying them.
- `npm run db:migrate-reset`: Reset the database and reapply migrations.
- `npm run db:migrate-force-reset`: Force reset the database and reapply migrations.
- `npm run lint`: Run ESLint on all TypeScript files in the project.

Each script uses [Turborepo](https://turbo.build/) to run the corresponding command in the appropriate workspace.

## Workspaces

- `packages/web`: Frontend React application
- `packages/server`: Backend Node.js server
- `packages/db`: Database and Prisma ORM configuration

For more details, see the README in each package.
