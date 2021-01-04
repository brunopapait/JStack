const { findById } = require('../repository/ContactsRepository');
const ContactsRepository = require('../repository/ContactsRepository');

class ContactController {
  async index(request, response) {
  /**
   * Listar todos os registros.
   */
    const contacts = await ContactsRepository.findAll();
    return response.json(contacts);
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

  async store(request, response) {
    /**
     * Criar novo registro
     */

    const {
      name, email, fone, category_id,
    } = request.body;

    const contactEmailExists = await ContactsRepository.findByEmail(email);

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (contactEmailExists) {
      return response.status(400).json({ error: 'This e-mail is already been talken' });
    }

    const contact = await ContactsRepository.create({
      name, email, fone, category_id,
    });

    return response.json(contact);
  }

  async update(request, response) {
    /**
     * Atualizar/Editar UM registro
     */
    const { id } = request.params;
    const {
      name, email, fone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactEmailExists = await ContactsRepository.findByEmail(email);

    if (contactEmailExists && contactEmailExists.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already been use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, fone, category_id,
    });

    return response.json(contact);
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
