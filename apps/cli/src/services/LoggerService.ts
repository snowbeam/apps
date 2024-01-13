import { Service } from "typedi";
import winston from "winston";

// eslint-disable-next-line new-cap
@Service()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    const level = "silent";
    this.logger = winston.createLogger({
      level,
      silent: true
    });
  }

  private log(level: )

  error(message: string, meta: object = {}): void {

  }
}
