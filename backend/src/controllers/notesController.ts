import { NextFunction, Request, Response } from "express";
import Note from "../models/note";

class NotesController {
  getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let sort = "-date";
      if (typeof req.query.sort === "string") {
        sort = req.query.sort.split(",").join();
      }

      let query = Note.find();
      query.sort(sort);
      const notes = await query;

      res.status(200).json({
        status: "success",
        total: notes.length,
        notes,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: `Following error occured - ${err}`,
      });
    }
  };

  createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const note = await Note.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          note: note,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "fail",
        message: `Failed to create the reource with error ${err}`,
      });
    }
  };

  getNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const note = await Note.findById(id);

      res.status(200).json({
        status: "success",
        data: {
          note,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: `Unable to get the note ${err}`,
      });
    }
  };

  updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const note = await Note.findByIdAndUpdate(id, req.body, { new: true });

      res.status(200).json({
        status: "success",
        data: {
          note,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: `${err}`,
      });
    }
  };

  deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Note.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: `${err}`,
      });
    }
  };
}

const notesController = new NotesController();

export default notesController;
