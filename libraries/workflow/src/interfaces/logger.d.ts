import { LOG_LEVELS } from "src/constants";

export type LogLevel = (typeof LOG_LEVELS)[number];
export type Logger = Record<
  Exclude<LogLevel, "silent">,
  (message: string, meta?: object) => void
>;
