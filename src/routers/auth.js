import { Router } from "express";

import * as authControllers from "../controllers/auth.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';
import { registerUserSchema, loginUserSchema } from "../validation/auth.js";
import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';
const authRouter = Router();

authRouter.post("/register", validateBody(registerUserSchema), ctrlWrapper(authControllers.registerController));
authRouter.get("/verify", ctrlWrapper(authControllers.verifyController));
authRouter.post("/login", validateBody(loginUserSchema), ctrlWrapper(authControllers.loginController));
authRouter.post("/refresh", ctrlWrapper(authControllers.refreshSessionController));
authRouter.post("/logout", ctrlWrapper(authControllers.logoutController));
authRouter.post( '/send-reset-email',validateBody(requestResetEmailSchema),ctrlWrapper(requestResetEmailController));
authRouter.post('/reset-pwd',validateBody(resetPasswordSchema),ctrlWrapper(resetPasswordController));
export default authRouter;
