import express from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose from "mongoose";
import {mongoURL, port} from './config/config';
import session from "express-session";
import passport from "passport";
import UserMongoDao from './daos/user.dao';
import { passportStrategies } from './lib/passport.lib';
import router from './routes/index';
import cors from 'cors';

const userMongo = UserMongoDao.getInstance();

const app = express();

app.use(cors());

app.use(json());

app.use(urlencoded({ extended: true }));

app.use(
    session({
        secret: "secret-note",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use("login", passportStrategies.loginStrategy);
passport.use("register", passportStrategies.registerStrategy);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id:any, done) => {
    const data = await userMongo.getById(id);
    done(null, data);
});

app.use(router);

mongoose.connect(mongoURL);
console.log("Database connected!");

const expressServer = app.listen(port, () => {
    console.log(`Server listening port ${port}`);
})

expressServer.on('error', (err:Error) => {
    console.log(err);
})

