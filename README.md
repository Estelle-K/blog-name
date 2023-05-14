# Blog example

This is an example showing how create a blog with SvelteKit and tRPC.

## Badges

![SvelteKit](https://img.shields.io/badge/SvelteKit-DC322F?style=for-the-badge&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![TAILWINDCSS](https://img.shields.io/badge/tailwindcss-success.svg?style=for-the-badge&logoColor=white)![TRPC](https://img.shields.io/badge/trpc-blue.svg?style=for-the-badge&logoColor=white)![PRISMA](https://img.shields.io/badge/prisma-orange.svg?style=for-the-badge&logoColor=white)

## Getting started

### How to install

Clone the project

```bash
  git clone git@github.com:Estelle-K/blog-name.git
```

Go to the project directory

```bash
  cd blog-name
```

Install dependencies

```bash
  npm install
```

### Create an account Planetcale and create a JWT jeton

It's necessary to duplicate the `.env.example` file to `.env` file (root folder). After that, if you have an account in [Planetscale](https://planetscale.com/), create a new database and copy `DATABASE_URL` in `.env` file. And create a JWT jeton and copy it in `JWT_SECRET`.

### Prisma

Add schema prisma

```bash
  npx prisma db push
```

### Install seed

Install seed if you want to test the app

```bash
  npx prisma db seed
```

### Use Prisma

See data in prisma

```bash
  npx prisma studio
```

### Start the project

```bash
  npm run dev
```

You can see the app: [http://127.0.0.1:5173/](http://127.0.0.1:5173/)