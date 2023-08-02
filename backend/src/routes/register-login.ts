import { Router } from 'express';
import passport from "passport";
import { userController } from '../controllers/user.controller';

const router = Router();

router.route('/login')
    .get(
        userController.getLogin)
    .post(
        passport.authenticate("login"),
        userController.getLogin
    );

router.
    post("/register", 
    passport.authenticate("register"),
    userController.getLogin);

router.get("/logout", userController.logout);

router.post("/forgot-password", userController.resetToken);

export const registerLoginRouter = router;
