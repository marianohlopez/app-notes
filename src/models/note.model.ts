import { model, Schema, Document } from "mongoose";

const noteSchema: Schema = new Schema({
    username: { type: String },
    title: { type: String },
    description: { type: String },
    date: { type: String }
  });

export const NoteModel = model("note", noteSchema);