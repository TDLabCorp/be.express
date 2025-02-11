import path from "path";
import { DATABASE_DIR } from "../config";
import _ from "lodash";
import { Database } from "sqlite3";

const DATABASE_NAME = "database.db";
const baseDir = _.split(DATABASE_DIR, path.sep);
const databaseDir = _.split(DATABASE_NAME, "/");

const _path = path.resolve(
  _.join(baseDir, path.sep),
  _.join(databaseDir, path.sep)
);

export const sqlite = new Database(_path);
