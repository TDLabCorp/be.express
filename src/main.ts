import { Request, Response, NextFunction } from "express";
import { logger } from "./Logger";
import { addIntercepter } from "./Intercepter";
import "./route";
import { addRequestDispatcher } from "./Dispatcher";

addIntercepter("/", (request: Request, response: Response) => {
  logger("catched intercepter.");
});

addRequestDispatcher(
  "/profile",
  "get",
  (request: Request, response: Response) => {
    const { path } = request;
    logger(`이것은 ${path}`);
    response.json({ message: "이건 아무것도 아녀요~" });
  }
);

addRequestDispatcher("/", "get", (request: Request, response: Response) => {
  const { path } = request;
  logger(`이것은 ${path}`);
  response.redirect("/profile");
});
