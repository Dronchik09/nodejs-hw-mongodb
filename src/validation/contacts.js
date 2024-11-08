import Joi from "joi";

import { typeList } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList).required(),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList),
});
