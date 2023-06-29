import { NoteModel, UserNotes } from "../models/note.model";
import MongoDao from "./mongo.dao";

let instance: NoteMongoDao;

export default class NoteMongoDao extends MongoDao<UserNotes> {
  constructor() {
    super(NoteModel);
  }
  
  static getInstance() {
    if (!instance) instance = new NoteMongoDao();

    return instance;
  }
}