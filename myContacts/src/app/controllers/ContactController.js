const ContactsRepository = require('../repository/ContactsRepository');

class ContactController {
  async index(request, response) {
  /**
   * Listar todos os registros.
   */

    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    /**
     * Obter apenas UM registro
     */
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
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

  async delete(request, response) {
    /**
     * Remover UM registro
     */
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);

    return response.json(contact.id);
  }
}

module.exports = new ContactController();
