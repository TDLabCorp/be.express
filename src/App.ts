import express, { Express, Request, Response } from "express";
import { logger } from "./Logger";

const app: Express = express();
const port = 5000;

app.get("/", (request: Request, response: Response) => {
  logger(`Typescript + Node.js + Express Server`);
  response.send(`Typescript + Node.js + Express Server`);
});

app.listen(port, () => {
  logger(`[server]: Server is running at <https://localhost>:${port}`);
});
