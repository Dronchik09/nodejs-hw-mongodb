import express from "express";
import cors from "cors";
import pino from "pino-http";
import dotenv from "dotenv";
import { env } from './utils/env.js';
import * as contactServices from "./services/contacts.js";


const PORT = Number(env("PORT", 3000));

dotenv.config();
export const startServer = ()=>{
    const app = express();
    app.use(cors());

    const logger = pino({
        transport:{
            target: "pino-pretty"
        }
    });
    app.use(logger);
    app.get('/contacts', async (req, res) => {
        const contacts = await contactServices.getAllContacts();
        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });

      });
    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;
        const contacts = await contactServices.getContactsById(contactId);
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contacts,
        });

    if (!contacts) {
        res.status(404).json({
          message: 'Student not found',
        });
        return;
      }
    });
    app.use((err, req, res) => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err.message,
        });
      });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
};
