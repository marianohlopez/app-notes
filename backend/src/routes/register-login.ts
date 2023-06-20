import { Router } from 'express';
import passport from "passport";
import getLogin from '../controllers/user.controller';

const router = Router();

router.route('/login')
    .get(getLogin)
    .post(
        passport.authenticate("login"),
        getLogin
    );

router.
    post("/register", 
    passport.authenticate("register"),
    getLogin)

export const registerLoginRouter = router;
