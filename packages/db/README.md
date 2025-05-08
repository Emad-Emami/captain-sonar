# @cs/db

This package contains the database layer for the Captain Sonar project. It includes database migrations, seeds, and Prisma ORM configurations.

## Features

- **Prisma ORM**: Provides a type-safe database client for interacting with the database.
- **Migrations**: Manage database schema changes using Prisma migrations.
- **Seeding**: Populate the database with initial or test data.

## Installation

To install the dependencies for this package, run:

```bash
npm install
```

## Scripts

The following scripts are available for managing the database:

- `npm run migrate-dev`: Apply migrations in development mode.
- `npm run migrate-deploy`: Apply migrations in production mode.
- `npm run push`: Push the Prisma schema to the database without creating a migration.
- `npm run pull`: Pull the database schema into the Prisma schema file.
- `npm run seed`: Seed the database with initial data.
- `npm run generate`: Generate Prisma client.
- `npm run validate`: Validate the Prisma schema.

## Environment Variables

This package uses environment variables stored in `.env.vault` files for different environments (e.g., development, staging, production). Ensure the correct environment variables are set before running the scripts.

## Directory Structure

- **migrations/**: Contains database migration files.
- **seeds/**: Contains scripts for seeding the database.
- **prisma/**: Contains the Prisma schema and configuration files.

## Usage

### Running Migrations

To apply migrations in development mode:

```bash
npm run migrate-dev
```

To apply migrations in production mode:

```bash
npm run migrate-deploy
```

### Seeding the Database

To seed the database with initial data:

```bash
npm run seed
```

### Generating Prisma Client

To generate the Prisma client:

```bash
npm run generate
```

## License

This package is licensed under the ISC License.