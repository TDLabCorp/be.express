import express, { Express, Request, Response, NextFunction } from "express";
import { logger } from "./Logger";
import { intercepter } from "./Intercepter";
import "./main";
import { dispatch } from "./Dispatcher";
import cors from "cors";

const app: Express = express();
const port = 5000;

app.all("*", (request: Request, response: Response, next: NextFunction) => {
  // filter를 여기서 지정합니다.
  intercepter(request, response, next);
});

dispatch(app);

app.use((err: Error, request: Request, response: Response, next: any) => {
  logger("what??");
  response.status(500);
  response.json({ message: err.message });
});

app.use(cors());

app.listen(port, () => {
  logger(`[server]: Server is running at <https://localhost>:${port}`);
});
