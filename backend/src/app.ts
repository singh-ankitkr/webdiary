import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notesRouter";

const app = express();

app.use(express.json());
app.use("/notes", notesRoutes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Express is running.",
    },
  });
});

export default app;
