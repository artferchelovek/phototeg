import "dotenv/config";
import express, { Request, Response } from "express";
import apiRouter from "./routes";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
  });
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
