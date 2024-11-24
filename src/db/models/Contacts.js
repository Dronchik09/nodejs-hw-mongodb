import { Schema, model } from "mongoose";

import { typeList } from "../../constants/contacts.js";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const contactSchema = new Schema(
    {
    name: {
        type: String,
        required : true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email :{
        type: String,

    },
    isFavourite :{
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        required : true,
        enum: typeList,
        default: "personal",
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"user",
        required: true,
    },
    photo: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateSettings);

contactSchema.post('findOneAndUpdate', handleSaveError);
export const sortByList = ["name", "phoneNumber", "email", "isFavorite", "contactType"];

const ContactCollection = model("contacts", contactSchema);

export default ContactCollection;
