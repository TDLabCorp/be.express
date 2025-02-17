import { Response } from "../Dispatcher";

export interface BaseResponse {
  success: boolean;
  command?: string;
}

export type ErrorCode =
  | "SignInFailure"
  | "RuntimeException"
  | "DatabaseIsGone"
  | "NotAllowPermit"
  | string;

export interface ErrorResponse {
  code: ErrorCode;
  format: string | undefined;
}

const errorResponse = (response: Response, error: ErrorCode): void => {
  response.json({ success: false, code: error });
};

const resultResponse = (
  response: Response,
  body?: any | undefined | void
): void => {
  response.json({ success: true, body });
};

export { errorResponse, resultResponse };
