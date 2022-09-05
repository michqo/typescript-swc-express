import express, { Request, Response, Express, NextFunction } from "express";
import cors from "cors";
import { z, AnyZodObject } from "zod";

const app: Express = express();
app.use(cors());
app.use(express.json());

const emailSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

app.post(
  "/submit",
  validate(emailSchema),
  async (req: Request<{ name: string }>, res: Response) => {
    res.json({ ...req.body });
  }
);

const server = app.listen(8000, () => {
  console.log("started");
});

export { app, server };
