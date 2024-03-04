import { Injectable } from '@nestjs/common';
import { transports, createLogger, format, Logger } from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;
  private context: string;

  constructor() {
    this.logger = createLogger({
      transports: [
        // log errors into its own file
        new transports.File({
          filename: `logs/error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
        }),
        // logging all level
        new transports.File({
          filename: `logs/combined.log`,
          format: format.combine(format.timestamp(), format.json()),
        }),
        // log in console
        new transports.Console({
          format: format.combine(
            format.json(),
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    });
  }

  error(message: string): void {
    this.logger.error(message, JSON.stringify({ context: this.context }));
  }

  log(message: string): void {
    this.logger.log('info', message, JSON.stringify({ context: this.context }));
  }

  debug(message: string): void {
    this.logger.debug(message, JSON.stringify({ context: this.context }));
  }

  warn(message: string): void {
    this.logger.warn(message, { context: this.context });
  }

  info(message: string): void {
    this.logger.info(message, { context: this.context });
  }
}
