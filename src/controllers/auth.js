import createHttpError from "http-errors";

import * as authServices from "../services/auth.js";

export const registerController = async (req,res) =>{
    const data = await authServices.register(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registered user",
        data,
    });
};
