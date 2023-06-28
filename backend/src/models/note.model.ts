import { model, Schema, Document } from "mongoose";

interface UserNotes extends Document {
    username?: string;
    notes?: Note[];
}

interface Note {
  title: string;
  description: string;
  date: string;
}

const noteSchema: Schema<UserNotes> = new Schema<UserNotes>({
  username: { type: String },
  notes: { type: [{ title: String, description: String, date: String }] }
});

const NoteModel = model<UserNotes>("note", noteSchema);

export {UserNotes, NoteModel, Note};
