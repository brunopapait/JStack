const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Bruno',
    email: 'brunohpapait@gmail.com',
    phone: '(44) 9 9999-9999',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactsRepository();
