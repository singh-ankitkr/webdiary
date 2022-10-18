import { Router } from "express";
import NotesController from "../controllers/notesController";

const notesRoutes = Router();

notesRoutes
  .route("/")
  .get(NotesController.getAllNotes)
  .post(NotesController.createNote);

notesRoutes
  .route("/:id")
  .get(NotesController.getNote)
  .patch(NotesController.updateNote)
  .delete(NotesController.deleteNote);

export default notesRoutes;
