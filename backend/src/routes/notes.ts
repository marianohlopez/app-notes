import { Router } from "express";
import { noteController} from "../controllers/note.controller";

const router = Router();

router.
    post("/create-note",
    noteController.createNote)

router.
    post("/update-note",
    noteController.updateNote)


export const notesRouter = router;