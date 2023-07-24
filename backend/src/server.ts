import express from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose from "mongoose";
import {mongoURL, port, originURL} from './config/config';
import session from "express-session";
import passport from "passport";
import UserMongoDao from './daos/user.dao';
import { passportStrategies } from './lib/passport.lib';
import router from './routes/index';
import cors from 'cors';

const userMongo = UserMongoDao.getInstance();

const app = express();

app.use(cors({
    origin: originURL,
    credentials: true
  }));


app.use(json());

app.use(urlencoded({ extended: true }));

app.use(
    session({
        secret: "secret-note",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly:true,
        },
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
    const user = await userMongo.getById(id);
    done(null, user);
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

