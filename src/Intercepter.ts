import { Request, Response, NextFunction, response } from "express";
import { logger } from "./Logger";
import _ from "lodash";

export interface HandlerIntercepter {
  (request: Request, response: Response): boolean | void | undefined;
}

interface Interceter {
  pathpatterns: string[];
  intercepter: HandlerIntercepter;
}

const _registries: Interceter[] = [];

const findAndRun = (request: Request, response: Response): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { url, path, params } = request;
    _.forEach(_registries, (element) => {
      const { pathpatterns, intercepter } = element;

      _.forEach(pathpatterns, (pathpattern) => {
        if (path == pathpattern) {
          intercepter(request, response);
        }
      });
    });
    resolve();
  });
};

export const addIntercepter = (
  patterns: string | string[],
  interceptFunction: HandlerIntercepter
) => {
  _registries.push({
    pathpatterns: [...patterns],
    intercepter: interceptFunction,
  });
};

export const intercepter = (
  request: Request,
  response: Response,
  next: NextFunction
): boolean => {
  findAndRun(request, response)
    .then(() => {})
    .catch((reason: any) => {})
    .finally(() => {
      next();
    });
  return true;
};
