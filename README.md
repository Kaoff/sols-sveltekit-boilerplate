# Sol's Sveltekit Boilerplate

This is a simple **SvelteKit** and **PostgreSQL** boilerplate using **Bun** that includes a few features to get you started :

- Tailwind CSS + DaisyUI for styling
- BiomeJS for formatting and linting
- Prisma ORM
- A basic authentication system

## Get started

### Install project
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