It uses a self-contained database (located at `./backend/prisma/dev.db`)

It contains 2 functions
### /.netlify/functions/graphql
A running GraphiQL, you can use query and mutation there to list create user
This function depends on things like nexus, nexus-plugin-prisma, prisma

### /.netlify/functions/countUsers
Just returns the user count. Depends only on prisma

## Running locally
- make sure you have netlify cli installed globally
- `pnpm install`
- `pnpm backend build`
- `pnpm backend dev`

## Uploading to netlify

Don't forget to set base directory as
```sh
./backend
```
Still not working online, just locally (this time because the DB won't work directly from serverless)