import { Response, Request } from "express"
import NoteMongoDao from "../daos/note.dao";
import { UserNotes }from "../models/note.model"

const noteMongo = NoteMongoDao.getInstance();

const createNote = async (req:any, res:Response) => {
    try{
        const { user } = req;
        const userNotes = await noteMongo.getByFilter({username: user.username});
        const {title, description, date} = req.body;
        if (userNotes) {
            userNotes.notes?.push({title, description, date});
            await noteMongo.update({username:user.username}, { notes: userNotes.notes });
            return res.status(200).json({ message: "Note created successfully" });
        } 
    }
    catch(err){
        console.error(`Error creating note: ${err}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getNotes = async (req: any, res: Response) => {
    try {
        const { user } = req;
        const data = await noteMongo.getAll();
        const response = data?.find( (el:UserNotes) => el.username === user?.username )
        res.json(response?.notes);
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
        const { id } = req.params;
        const userNotes = await noteMongo.getByFilter({username: user.username});
        const newArrayNotes = userNotes?.notes?.filter((el:any) => el._id != id)      
        newArrayNotes?.push({title, description, date})
        await noteMongo.update({username:user.username}, { notes: newArrayNotes });
        return res.status(200).json({ message: "Note updated successfully" });
    }
    catch(err){
        console.error(`Error updating notes: ${err}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteNote = async (req: any, res: Response) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const userNotes = await noteMongo.getByFilter({username: user.username});
        const newArray = userNotes?.notes?.filter((el:any) => el._id != id) 
        await noteMongo.update({username:user.username}, { notes: newArray });
        return res.status(200).json({ message: "Note deleted successfully" });
    }
    catch(err){
        console.error(`Error deleting notes: ${err}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const noteController = {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
};

