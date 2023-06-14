import { model, Schema, Document } from "mongoose";

interface Note extends Document {
    username?: string;
    title?: string;
    description?: string;
    date?: string;
  }
  
  const noteSchema: Schema<Note> = new Schema<Note>({
    username: { type: String },
    title: { type: String },
    description: { type: String },
    date: { type: String }
  });
  

export const NoteModel = model<Note>("note", noteSchema);
