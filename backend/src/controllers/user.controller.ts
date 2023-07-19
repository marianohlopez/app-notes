import { Response, Request } from "express";
import { User } from "../models/user.model";

const getLogin = (req: Request, res: Response) => {

    try {
        console.log(req.user);
        
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

export const userController = {
    getLogin,
    logout,
};