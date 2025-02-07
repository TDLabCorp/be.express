import { createLogger, format, transports } from "winston";
import { TransformableInfo } from "logform";

const _logger = createLogger({
  transports: [
    new transports.Console({
      level: "debug",
      format: format.combine(
        format.label({ label: "[localhost]" }),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.colorize(),
        format.printf(
          (info: TransformableInfo) =>
            `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`
        )
      ),
    }),
  ],
});

export const logger = (message: string) => {
  _logger.debug(message);
};

// export function logger(message: string) {
//   _logger.debug(message);

//   // return {
//   //   debug: (message: string) => {},
//   // };
// }
