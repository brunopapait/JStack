const http = require('http');
const routes = require('./routes');
const url = require('url');


const server = http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url, true);

  request.query = parsedUrl.query;
  console.log(`Método: ${request.method} | URL: ${parsedUrl.pathname}`);

  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ));

  if (route) {
    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3000, () => {
  console.log('Aplicação rodando na url http://localhost:3000')
});
