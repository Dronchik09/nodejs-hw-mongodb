import createHttpError from "http-errors";
import * as contactServices from "../services/contacts.js";

export const getContactsController = async (req, res, next) => {
        const contacts = await contactServices.getAllContacts();
        res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};
 export const getContactsByIdController = async (req, res) => {
        const { contactId } = req.params;
    const contacts = await contactServices.getContactsById(contactId);
    if (!contacts) {
        throw createHttpError(404, 'Contact not found!');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contacts,
    });

};

export const addContactController = async (req,res) => {
    const data = await contactServices.addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const upsertContactController = async (req,res) =>{
    const {id: _id} = req.params;
    const result = await contactServices.updateContact({_id, payload: req.body, options: {upsert:true}});

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message:"Contact upserted",
        data: result.data,
    });
};

export const patchContactController = async (req,res) =>{
    const {id: _id} = req.params;
    const result = await contactServices.updateContact({_id, payload: req.body});

    if(!result){
        throw createHttpError(404,'Contact not found!');
    }
    res.json({
        status: 200,
        message: `Successfully patched a contact!`,
        data: result.data,
    });
};

export const deleteContactController = async (req,res) =>{
    const {id: _id} = req.params;
    const data = await contactServices.deleteContact({_id});

    if(!data){
        throw createHttpError(404,'Contact not found!');
    }

    res.status(204).send();
};
