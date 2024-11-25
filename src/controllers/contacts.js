import createHttpError from "http-errors";
import * as contactServices from "../services/contacts.js";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";

import mongoose from 'mongoose';

import { parseSortParams } from "../utils/parseSortParams.js";

import { sortByList } from "../db/models/Contacts.js";

import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getContactsController = async (req, res, next) => {
    const {page, perPage} = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query, sortByList);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;
    filter.userId = userId;

    const data = await contactServices.getAllContacts({page, perPage, sortBy, sortOrder,filter, userId} );
        res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: data,
    });
};
 export const getContactsByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createHttpError(404, 'Contact not found');
      }
    const contact = await contactServices.getContactById(id, userId);
    if (!contact) {
        throw createHttpError(404, 'Contact not found!');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
    });

};

export const addContactController = async (req,res, next) => {
    const {id: _id} = req.params;
    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
          photoUrl = await saveFileToCloudinary(photo);
        } else {
          photoUrl = await saveFileToUploadDir(photo);
        }
      }
      const result = await contactServices.addContact( { _id, userId }, {...req.body,photo: photoUrl,});
    if (!result) {
      return next(createHttpError(404, 'Contact not found!'));
    }
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: result.data,
    });
};

export const upsertContactController = async (req,res) =>{
    const {id: _id} = req.params;
    const userId = req.user._id;
    const result = await contactServices.updateContact({_id,userId}, req.body, {upsert:true});


    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message:"Contact upserted",
        data: result.data,
    });
};

export const patchContactController = async (req,res, next) =>{
    const {id: _id} = req.params;
    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;

    if (env('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
      const result = await contactServices.updateContact( { _id, userId }, {...req.body,photo: photoUrl,});
    if (!result) {
      return next(createHttpError(404, 'Contact not found!'));
    }
    res.json({
        status: 200,
        message: `Successfully patched a contact!`,
        data: result.data,
    });
};

export const deleteContactController = async (req,res) =>{
    const {id: _id} = req.params;
    const userId = req.user._id;
    const data = await contactServices.deleteContact({_id,userId});

    if(!data){
        throw createHttpError(404,'Contact not found!');
    }

    res.status(204).send();
};
