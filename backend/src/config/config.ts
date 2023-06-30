import dotenv from "dotenv";

dotenv.config()

export const mongoURL:any = process.env.MONGO_URL;
export const port = process.env.PORT || 3000;