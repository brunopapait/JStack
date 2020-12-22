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
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(userOrder));
  }
}