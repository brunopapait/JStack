const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Bruno',
    email: 'brunohpapait@gmail.com',
    phone: '(44) 9 9999-9999',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Maria',
    email: 'mariapapait@gmail.com',
    phone: '(44) 9 8888-7777',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
