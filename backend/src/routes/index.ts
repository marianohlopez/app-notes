import { Router } from "express";
import { registerLoginRouter } from "./register-login";

const router = Router();

router.use(registerLoginRouter);

export default router;

