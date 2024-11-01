import {Router} from "express";
import * as contactServices from "./services/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/contacts', async (req, res) => {
    const contacts = await contactServices.getAllContacts();
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });

  });
  contactsRouter.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contacts = await contactServices.getContactsById(contactId);
    if (!contacts) {
      res.status(404).json({
          status:404,
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contacts,
    });
});

export default contactsRouter;
