import createHttpError from "http-errors";
import * as contactServices from "../services/contacts.js";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";

import { parseSortParams } from "../utils/parseSortParams.js";

import { sortByList } from "../db/models/Contacts.js";

export const getContactsController = async (req, res, next) => {
    const {page, perPage} = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query, sortByList);
        const data = await contactServices.getAllContacts({page, perPage, sortBy, sortOrder});
        res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: data,
    });
};
 export const getContactsByIdController = async (req, res) => {
        const { id } = req.params;
    const contact = await contactServices.getContactsById(id);
    if (!contact) {
        throw createHttpError(404, 'Contact not found!');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
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
    const data = await contactServices.deleteContact(_id);

    if(!data){
        throw createHttpError(404,'Contact not found!');
    }

    res.status(204).send();
};
