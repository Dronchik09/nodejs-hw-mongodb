import { Schema, model } from "mongoose";


const contactSchema = Schema(
    {
    name: {
        type: String,
        reqired : true,
    },
    phoneNumber: {
        type: String,
        reqired: true,
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
        reqired : true,
        enum: ['work', 'home', 'personal'],
        default: "personal",
    },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const ContactCollection = model("contacts", contactSchema);

export default ContactCollection;
