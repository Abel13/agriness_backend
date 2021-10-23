# agriness_backend

This project was made with AdonisJS.

## Start the development server:

1- Clone this project

2- Download its dependencies running on terminal:

```shell
yarn
```

3- Now, run the server:

```
node ace serve --watch
```

The serve command starts the HTTP server and performs an in-memory compilation of TypeScript to JavaScript.

The --watch flag is meant to watch the file system for changes and restart the server automatically.

By default, the server starts on PORT 3333 (defined inside the .env file). You can view the welcome page by visiting http://localhost:3333.

## Compiling for production

You can create the production build by running the following command.

```
node ace build --production
```

The compiled output is written to the build folder. You can cd into this folder and start the server by directly running the server.js file.

```
cd build
node server.js
```

## .ENV

Create a .env file in the root of application, there is a .env.example file who shows the required environment variables

## Tests

As suggested on Adonis docs this project uses Japa as test runner

To execute all tests run:

```
node -r @adonisjs/assembler/build/register japaFile.ts
```
