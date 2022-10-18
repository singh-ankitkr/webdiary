import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  note: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
