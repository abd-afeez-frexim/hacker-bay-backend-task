'use strict'
const swaggerJSDoc = use("Swagger")
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '2.0.0',
    description: 'Api documentation for main black project.',
  },
  host: 'localhost:3333',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs

  apis: ['./start/swagger/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

const Route = use('Route')

// define swagger doc routes
Route.get('/swagger.json', function({request, response}) {
  response.header('Content-Type', 'application/json');
  response.json(swaggerSpec);
});

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})
Route.post('/login', 'AuthController.login')
Route.post('/patch', 'AuthController.patch').middleware("jwtAuth")
Route.post('/thumbnail', 'AuthController.thumbnail').middleware("jwtAuth")
