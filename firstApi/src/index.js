const http = require('http');
const routes = require('./routes');
const url = require('url');

const bodyPaser = require('./helpers/bodyParser');

const server = http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url, true);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));

  if (route) {
    request.query = parsedUrl.query;
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    }

    if (['POST', 'PUT', 'PATH'].includes(request.method)) {
      bodyPaser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }


  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(`Cannot ${request.method} ${pathname}`);
  }
});

server.listen(3000, () => {
  console.log('Aplicação rodando na url http://localhost:3000')
});
