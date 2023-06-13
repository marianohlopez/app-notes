import { model, Schema, Document } from "mongoose";

interface User extends Document {
    username?: string;
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
  }
  
  const userSchema: Schema<User> = new Schema<User>({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
  });
  

export const UserModel = model<User>("user", userSchema);