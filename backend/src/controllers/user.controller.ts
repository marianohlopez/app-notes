import { Response, Request } from "express";
import { User } from "../models/user.model";
import UserMongoDao from "../daos/user.dao";
import { sendPasswordMail } from "../services/nodemailer";
import { v4 as uuidv4 } from 'uuid';

const userMongo = UserMongoDao.getInstance();

const getLogin = (req: Request, res: Response) => {
    try {
        if (req.isAuthenticated()) {
            const user = req.user as User;  
            return res.json({
                user: user.username,
                name: user.firstname,
                lastname: user.lastname,
                email: user.email,
            });
        }
    } catch (err) {
        console.error(`error logging user: ${err}`);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const logout = (req: any, res: Response) => {
    try {
      req.logout((err:any) => {
				if(err){
					console.error(`Error logging out: ${err}`);
				}
				return res.status(200).json({ message: "Logged out successfully" });
			}); 
    } catch (err) {
      console.error(`Error logging out: ${err}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

const resetToken = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const token = uuidv4();
      const user = await userMongo.getByFilter({email});
      
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      await userMongo.update({ username:user.username }, { resetToken:token });
      await sendPasswordMail(email, token)
      res.status(200).json({ message: 'Correo electrónico enviado con éxito.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al enviar el correo electrónico.' });
    }
  };

export const userController = {
    getLogin,
    logout,
    resetToken,
};