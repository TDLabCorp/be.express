import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 5000;

app.get("/", (request: Request, response: Response) => {
  response.send(`Typescript + Node.js + Express Server`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
