import { Response, Request } from "express";
import { User } from "../models/user.model";

const getLogin = (req: Request, res: Response) => {

    if (req.isAuthenticated()) {
        const user = req.user as User;
        return res.json({
            user: user.username,
            name: user.firstname,
            lastname: user.lastname,
            email: user.email,
        });
    }

    return res.status(401).json({ message: "Unauthorized" });
};

export default getLogin;