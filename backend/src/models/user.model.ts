import { model, Schema, Document } from "mongoose";

interface User extends Document {
    username?: string;
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    resetToken?: string;
  }
  
const userSchema: Schema<User> = new Schema<User>({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    resetToken: {type: String},
});
  

const UserModel = model<User>("user", userSchema);

export { User, UserModel };