const { request } = require('https');
const users = require('../mocks/users');

module.exports = {
  listUsers(req, res) {
    const { order } = req.query;
    const userOrder = users.sort((a, b) => {
      if (order === 'desc') {
        return a < b ? 1 : -1;
      }

      return a > b ? 1 : -1;
    });
    res.send(200, userOrder);
  },

  getUserById(req, res) {
    const { id } = req.params;
    const user = users.find((item) => item.id === Number(id));

    if (!user) {
      return res.send(400, { error: 'User not found' });
    }

    res.send(200, user);
  },
  createUser(req, res) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      body = JSON.parse(body);

      const lastUserId = users[users.length - 1].id;

      const newUser = {
        id: lastUserId + 1,
        name: body.name,
      }

      users.push(newUser);

      res.send(200, newUser);
    });
  }
}