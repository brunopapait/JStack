const ContactsRepository = require('../repository/ContactsRepository');

class ContactController {
  async index(request, response) {
  /**
   * Listar todos os registros.
   */

    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  show() {
    /**
     * Obter apenas UM registro
     */
  }

  store() {
    /**
     * Criar novo registro
     */
  }

  update() {
    /**
     * Atualizar/Editar UM registro
     */
  }

  delete() {
    /**
     * Remover UM registro
     */
  }
}

module.exports = new ContactController();
