import { GetMapping, PostMapping, Request, Response } from "../../Dispatcher";
import { logger } from "../../Logger";

type SessionItem = {
  name: string;
  id: string;
};

declare module "express-session" {
  interface SessionData {
    auth?: undefined | SessionItem;
  }
}

class Login {
  @PostMapping("/login")
  LoginProcess(request: Request, response: Response) {
    const { session } = request;

    if (session.auth) {
      logger("이미 로그인되어 있습니다.");
      response.json({ message: "이미 로그인되어 있습니다." });
    } else {
      session.auth = {
        name: "관리자",
        id: "fdawsfedqac_erwa",
      };
      response.json({ message: "로그인 성공" });
    }
  }

  @GetMapping("/logout")
  LogOutProcess(request: Request, response: Response) {
    const { session } = request;

    if (session.auth) {
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
