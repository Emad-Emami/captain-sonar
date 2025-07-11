# Tech stack

The Captain Sonar project is a full-stack monorepo that leverages modern technologies for both frontend and backend development, as well as database management and developer tooling.

## Frontend

* **React Router v7**: Used as the main frontend framework for building the web application, enabling server-side rendering (SSR), data loading, and routing.
* **React 19**: The core UI library for building interactive user interfaces.
* **Mantine UI**: Provides a set of accessible and customizable React components for rapid UI development.
* **TypeScript**: Ensures type safety and better developer experience across the frontend codebase.
* **Vite**: Used as the build tool and development server for fast HMR and optimized builds.

## Backend

* **WebSockets (ws)**: Enables real-time communication between the server and clients.
* **Zod**: Used for schema validation and type-safe data parsing.
* **Redis**: Provides caching and pub/sub capabilities for scalable real-time features.
* **TypeScript**: Used throughout the backend for type safety.

## Database

* **Prisma ORM**: A type-safe ORM for interacting with the database, managing migrations, and generating database clients.
* **PostgreSQL** (or other supported DB): The primary relational database (actual DB may vary based on environment/configuration).
* **Prisma Migrations & Seeds**: Used for schema evolution and populating initial/test data.

## Monorepo & Tooling

* **Turborepo**: Manages the monorepo, enabling efficient builds, caching, and running scripts across packages.
* **ESLint & Prettier**: Enforce code quality and consistent formatting across all packages.
* **Jest & Testing Library**: Used for unit and integration testing.
* **Workspaces**: The project is organized into workspaces/packages for web, server, and db, each with its own dependencies and scripts.

## Directory Structure

* `packages/web`: Frontend React application
* `packages/server`: Backend Node.js server
* `packages/db`: Database schema, migrations, and Prisma configuration

This stack enables rapid development, type safety, and scalability for both the frontend and backend, with a strong focus on developer experience and maintainability.
