import { Express, Request, Response } from "express";
import { logger } from "./Logger";
import _ from "lodash";

export { Request, Response };

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch" | "all";
// | "head"
// | "options"
// | "connect"
// ;

export interface HandlerDispatcher {
  (request: Request, response: Response): void;
}

interface RequestDispatcher {
  path: string;
  method: HttpMethod;
  dispatcher: HandlerDispatcher;
}

const _dispatchers: RequestDispatcher[] = [];

export function GetMapping(path: string) {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    const originMethod = descriptor.value;
    addRequestDispatcher(path, "get", originMethod);
  };
}

export function PostMapping(path: string) {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    const originMethod = descriptor.value;
    addRequestDispatcher(path, "post", originMethod);
  };
}

export function PutMapping(path: string) {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    const originMethod = descriptor.value;
    addRequestDispatcher(path, "put", originMethod);
  };
}

export function PatchMapping(path: string) {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    const originMethod = descriptor.value;
    addRequestDispatcher(path, "patch", originMethod);
  };
}

export function DeleteMapping(path: string) {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    const originMethod = descriptor.value;
    addRequestDispatcher(path, "delete", originMethod);
  };
}

export function AllMapping(path: string) {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    const originMethod = descriptor.value;
    addRequestDispatcher(path, "all", originMethod);
  };
}

export const dispatch = (app: Express) => {
  _.forEach(_dispatchers, (element: RequestDispatcher) => {
    const { path, method, dispatcher } = element;

    switch (method) {
      case "get":
        {
          app.get(path, dispatcher);
        }
        break;
      case "post":
        {
          app.post(path, dispatcher);
        }
        break;
      case "delete":
        {
          app.delete(path, dispatcher);
        }
        break;
      case "put":
        {
          app.put(path, dispatcher);
        }
        break;
      case "patch":
        {
          app.patch(path, dispatcher);
        }
        break;
      case "all":
        {
          app.all(path, dispatcher);
        }
        break;
    }
  });
};

export const addRequestDispatcher = (
  path: string,
  method: HttpMethod,
  dispatcher: HandlerDispatcher
) => {
  _dispatchers.push({
    path,
    method,
    dispatcher,
  });
};
