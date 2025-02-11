import { Request, Response, NextFunction } from "express";
import { logger } from "./Logger";
import { addIntercepter } from "./Intercepter";
import "./route";

import path from "path";
import _ from "lodash";

import session from "express-session";
import * as sqlite3 from "sqlite3";
import sqliteStoreFactory from "express-session-sqlite";
import { assignSessionStore } from "./SessionStore";

import { DATABASE_DIR } from "./config";

const SESSION_DB_SURFIX = "session.db";
// const DATABASE_DIR = `${__dirname}${path.sep}..${path.sep}data`;

const baseDir = _.split(DATABASE_DIR, path.sep);
const sessionDir = _.split(SESSION_DB_SURFIX, "/");

const _path = path.resolve(
  _.join(baseDir, path.sep),
  _.join(sessionDir, path.sep)
);

const sqliteStore = sqliteStoreFactory(session);

assignSessionStore(
  new sqliteStore({
    driver: sqlite3.Database,
    path: _path,
    ttl: 600000, // 600 seconds
    prefix: "session-",
    cleanupInterval: 300000,
  })
);
addIntercepter("/", (request: Request, response: Response) => {
  logger("catched intercepter.");
});
