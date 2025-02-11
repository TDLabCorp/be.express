import _ from "lodash";
import {
  DeleteMapping,
  GetMapping,
  PostMapping,
  Request,
  Response,
} from "../../Dispatcher";
import { logger } from "../../Logger";
import { Session } from "../../service";
import { encrypt } from "../../util";

declare namespace Model {
  export interface Session {
    id: string;
    name: string;
    user_id: string;
  }
}

declare module "express-session" {
  interface SessionData {
    auth?: undefined | Model.Session;
  }
}

class Login {
  @GetMapping("/session")
  async Profile(request: Request, response: Response) {
    const { session } = request;

    if (session.auth) {
      response.json(_.omit(session.auth, ["id"]));
    } else {
      response.sendStatus(401);
    }
  }

  @PostMapping("/session")
  async LoginProcess(request: Request, response: Response) {
    const {
      session,
      params,
      body: { id, password },
    } = request;

    if (session.auth) {
      logger(`session: ${JSON.stringify(session.auth)}`);
      response.sendStatus(200);
    } else {
      try {
        const user = await Session.findUser(id);
        if (user?.password == encrypt(password)) {
          session.auth = {
            name: user.name,
            id: user.id,
            user_id: user.user_id,
          };
          session.save((err) => {
            if (err) {
              throw new Error("로그인에 실패하였습니다.");
            } else {
              response.json({ message: "로그인 성공" });
              logger(`session.save((err))`);
            }
          });
        } else {
          throw new Error("로그인에 실패하였습니다.");
        }
      } catch (err) {
        logger(`raised exception - ${err}`);
        response.sendStatus(500);
        // throw err;
      }
    }
  }

  @DeleteMapping("/session")
  LogOutProcess(request: Request, response: Response) {
    const { session } = request;

    // logger(`LogOutProcess - id: ${session.id}`);
    if (session.auth) {
      // logger(`if (session.auth) { - ${JSON.stringify(session.auth)}`);
      session.destroy((err) => {
        if (!err) {
          response.sendStatus(200);
        } else {
          response.sendStatus(500);
        }
      });
    } else {
      response.sendStatus(500);
    }
  }
}
