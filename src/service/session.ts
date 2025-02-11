import { Statement } from "sqlite3";
import { logger } from "../Logger";
import { decrypt, encrypt } from "../util";
import { sqlite } from "./db";

interface User {
  id: string;
  user_id: string;
  name: string;
  password: string;
}

export const findUser = (id: string): Promise<User | undefined> => {
  return new Promise<User | undefined>((resolve, reject) => {
    sqlite.all(
      `SELECT id, user_id, name, password FROM user WHERE user_id = '${id}'`,
      (err: Error, rows: any[]) => {
        if (err) {
          reject(err);
        }
        rows.forEach((row) => {
          resolve(row);
        });
      }
    );
  });
  /**
  logger(`SELECT * FROM User WHERE user_id = '${id}'`);
  sqlite.all(
    `SELECT id, user_id, password FROM user WHERE user_id = '${id}'`,
    (err: Error, rows: any[]) => {
      if (err) {
        throw err;
      }
      logger(`res => ${JSON.stringify(rows)}`);
      rows.forEach((row) => {
        logger(`${row.id}: ${row.name}`);
      });
    }
  );

//   return undefined;
    //** */
};
