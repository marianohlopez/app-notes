import dotenv from "dotenv";

dotenv.config()

export const mongoURL: string = process.env.MONGO_URL ?? 'default-value';
export const originURL: string = process.env.ORIGIN_URL ?? 'default-value';
export const port = process.env.PORT || 3000;