import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http";
import dotenv from "dotenv";
import { env } from './utils/env.js';

import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";
import { UPLOAD_DIR } from './constants/index.js';
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = Number(env("PORT", 3000));

dotenv.config();
export const startServer = ()=>{
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());

    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );
    app.get('/', (req, res) => {
      res.json({
        message: 'Hello to contactlist!',
      });
    });
    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use("/auth", authRouter);
    app.use("/contacts", contactsRouter);

    app.use('*', notFoundHandler);
    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
};
