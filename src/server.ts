import express, { Request, Response, Express } from "express";
import cors from "cors";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/hello/:name", async (req: Request<{ name: string }>, res: Response) => {
  res.send({
    "msg": `Hello ${req.params.name}`
  });
});

const server = app.listen(8000, () => {
  console.log("started");
});

export { app, server };
