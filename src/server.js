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
    app.use(express.json());
    app.use(cors());

    const logger = pino({
        transport:{
            target: "pino-pretty"
        }
    });
    app.use(logger);
    app.get('/', (req, res) => {
      res.json({
        message: 'Hello to contactlist!',
      });
    });
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
    app.use('*', (req, res) => {
      res.status(404).json({
          status: 404,
        message: 'Not found',
      });
    });
    app.use((err, req, res, next) => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err.message,
        });
      });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
};
