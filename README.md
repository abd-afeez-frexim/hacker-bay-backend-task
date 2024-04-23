# Hackerbay backend task

This is the backend implementation of the hackerbay backend task.
This application make use of the adonis js api blueprint

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Install dependencies

```bash
npm install
```
create a new .env file inside the root of the project

copy the content of .env.example to this file and add a random secrete key to APP_KEY="your secrete"

This secrete would be used to generate jwt token for authentication and it is necessary for the test to pass.


Then run the server

```bash
npm start
```
Then run the test


```bash
npm test
```

check debug and error logs at log/adonis.log

### API documentation

Read api doc at localhost:3333/api-docs
it will explain how to use the 3 endpoints

The first endpoints is for loging in. The login endpoint
generates a jwt token to be applied as an authorization header bearer for the other endpoints.

The second endpoint accepts a json object and a json patch object. The patch is then apllied on the json object and the readjusted json is returned.

The third point accepts an image url and return a thumbnail version of the image.
