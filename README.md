# Sol's Sveltekit Boilerplate

This is a simple **SvelteKit** and **PostgreSQL** boilerplate using **Bun** that includes a few features to get you started :

- Tailwind CSS + DaisyUI for styling
- BiomeJS for formatting and linting
- Prisma ORM
- A basic authentication system

## Get started

You'll need [Bun](https://bun.sh/), [Docker](https://docs.docker.com/desktop/) and [Docker Compose](https://docs.docker.com/compose/) before continuing.

### Install project

First, copy and paste .env.example and rename it .env.
Change values as your prefer :

```
DOCKER_DB_PORT=5432 # The port you want to expose the database on
DOCKER_ADMINER_PORT=8080 # The port you want to expose the adminer on

DATABASE_USER=boilerplate # The PostgreSQL user
DATABASE_PASSWORD=boil3rpl4t3  # The PostgreSQL password
DATABASE_HOST=localhost:5432 # The PostgreSQL host
DATABASE_NAME=mydb # The PostgreSQL database name

# Don't change this
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?schema=public"

APP_SUPERADMIN_USERNAME=admin # Your app superadmin username
APP_SUPERADMIN_PASSWORD=admin # Your app superadmin password
```

You can now run docker compose
```
docker compose up -d
```

And install dependencies :
```
bun install
```

### Initialize database
```
bunx prisma migrate dev --name init
```

### Seed database
```
bunx prisma db seed
```

### Run project in dev mode
```
bun --bun dev
```