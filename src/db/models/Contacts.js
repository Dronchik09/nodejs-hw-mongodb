import { Schema, model } from "mongoose";

import { typeList } from "../../constants/contacts.js";

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
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const sortByList = ["name", "phoneNumber", "email", "isFavorite", "contactType"];

const ContactCollection = model("contacts", contactSchema);

export default ContactCollection;
