# Peer Grading Tool

The Peer Grading Tool (PGT) is used for mutual and individual evaluation of group work.

## Initial setup

1. First, the .env file must be set up for the backend. For this purpose, `.env.example` can be used as a template. (make sure to properly secure your environment variables when working in a productive environment)
   - DATABASE_URL, JWT-SECRET, JWT_REFRESH_SECRET and HOST can be left for local use.
   - SEND_GRID_KEY and SEND_GRID_SENDER_EMAIL must be obtained from sendgrid. see `https://sendgrid.com/`
2. Use `npm i` in the `frontend/` and `backend/` folder.

   - Then check whether the Prisma version in `/backend/package.json` and `/backend/package-lock.json` is at least 4.7.1.

3. Set up the database for the first time.
   - Copy `backend/prisma/seed.example.ts` in this folder and rename to `seed.ts`.
   - Change `seed.ts` according to your needs, such as creating a user with your e-mail adress.
   - Execute the command `npx prisma migrate dev --name init` in the `/backend` folder. This will create `dev.db` in the `backend/prisma/` folder.

## Start locally

To serve the frontend, use `npm run start` in the `/frontent`.

To serve the backend, `npm run start` in the `/backend` folder. `npm run start:dev` will start the backend in watch mode.

## Database

If required, the command `npm run db:reset` can be used in the `/backend` folder to reset the database using your `seed.ts` file

If a change has been made to the database model, i.e. to the file `/backend/prisma/schema.prisma`, you can delete `dev.db` or use `npx prisma migrate dev --create-only`.

## Local Deploy

PGT uses Docker Compose to deploy. You can deploy it locally by using `docker compose up` in the root directory.
You can have a look at the deployed app by going to `http://localhost:5000`.
This is useful for testing the localized build, because the angular server only allows for one language at a time.
