import express, { Express, Request, Response, NextFunction } from "express";
import { logger } from "./Logger";
import { intercepter } from "./Intercepter";
import "./main";
import { dispatch } from "./Dispatcher";
import cors from "cors";
import session from "express-session";
import _ from "lodash";
import { store } from "./SessionStore";

const app: Express = express();
app.use(cors());
app.use(
  session({
    store: store,
    secret: "MUIOCJD",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, () => {
  logger(`Server is running at <https://localhost>:${port}`);
});
