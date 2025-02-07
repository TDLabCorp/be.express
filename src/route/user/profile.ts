import { GetMapping, Request, Response } from "../../Dispatcher";
import { logger } from "../../Logger";

class Profile {
  @GetMapping("/profile")
  fetchProfile(request: Request, response: Response) {
    logger("fetch My Profile");
    response.json({});
  }
}
