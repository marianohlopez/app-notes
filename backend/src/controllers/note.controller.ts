import { Response, Request } from "express"
import NoteMongoDao from "../daos/note.dao";
import { Note }from "../models/note.model"

const noteMongo = NoteMongoDao.getInstance();

const createNote = async (req:any, res:Response) => {
    try{
        const { user } = req;
        const userNotes = await noteMongo.getByFilter(user.usermame);
        const {title, description, date} = req.body;
        if (userNotes) {
            userNotes.notes?.push({title, description, date});
            await noteMongo.update({username:user.username}, userNotes);
            return res.status(200).json({ message: "Note created successfully" });
        } 
    }
    catch(err){
        console.error(`Error creating note: ${err}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getNotes = async (req: Request, res: Response) => {
    try {
        const response = await noteMongo.getAll();
        return response;
    }
    catch(err){
        console.error(`Error getting notes: ${err}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateNote = async (req: any, res: Response) => {
    try {
        const { user } = req;
        const { title, description, date } = req.body;
        const userNotes = await noteMongo.getByFilter(user.usermame);
        const { noteTitle } = req.params;
        const note = userNotes?.notes?.find((el:Note) => el.title === noteTitle);
        
    }
    catch(err){
        console.error(`Error updating notes: ${err}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const noteController = {
    createNote,
    getNotes,
    updateNote,
};

