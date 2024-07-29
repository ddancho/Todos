# Todos - client

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Besides NextJS following libraries are used in the project:

- [Shadcn/ui Component Library](https://ui.shadcn.com/)
- [Iron Session](https://www.npmjs.com/package/iron-session)
- [Zod - typeScript first schema validation](https://zod.dev/)
- [Tanstack React Query](https://www.npmjs.com/package/@tanstack/react-query)
- [React Hook Form](https://www.npmjs.com/package/react-hook-form)

## Getting Started

first, copy .env.example and rename to .env and write down required information,

to install packages run:

```bash
npm install
```

to run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

# Todos - server

This is a [Asp.NET Core .NET 8.0](https://learn.microsoft.com/en-us/aspnet/core/getting-started/?view=aspnetcore-8.0) project developed with [VS Code](https://code.visualstudio.com/) on the [Linux Mint System](https://www.linuxmint.com/)

Following packages (and software app) are used in the project:

- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/)
- [Fluent Validation](https://docs.fluentvalidation.net/en/latest/)
- [Docker with PostgreSQL image](https://docs.docker.com/)
- ApiKey Auth

## Getting Started

first, cd to API subfolder and write required information in the docker-compose.yml and appsettings.json file,
because postgres is running inside docker container connection string Host property is localhost, everything else:

```bash
POSTGRES_USER: => Username=
```

```bash
POSTGRES_PASSWORD: => Password=
```

```bash
POSTGRES_DB: => Database=
```

then, to build the project run:

```bash
dotnet build
```

to start a docker container with the postgres database image cd to API subfolder and run:

```bash
docker-compose up -d
```

to enable HTTPS use in a development check the following information,
if you are on the windows you are probably fine, check if you already have self-signed certificate to enable HTTPS use in local web app development, unix os users will have some issues, this command did NOT work for me, use at your own risk,
FYI if you enable https you will have to add cors services yourself

- [More Info](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-dev-certs)

to start a development server cd to API subfolder and run:

```bash
dotnet run
```

swagger openapi is active on the address (replace ---- with your port value):

- (http://localhost:----/swagger/index.html)
