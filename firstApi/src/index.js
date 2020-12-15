const http = require('http');

const users = require('./mocks/users');

const server = http.createServer(function (request, response) {
  console.log(`Método: ${request.method} | URL: ${request.url}`);

  if (request.method === 'GET' && request.url === '/users') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

server.listen(3000, () => {
  console.log('Aplicação rodando na url http://localhost:3000')
});
