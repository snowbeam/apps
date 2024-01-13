interface BaseTriggerTime<T extends string> {
  mode: T;
}

type CronExpression = string;
interface CustomTrigger extends BaseTriggerTime<"custom"> {
  cronExpression: CronExpression;
}

interface EveryX<U extends string> extends BaseTriggerTime<"everyX"> {
  unit: U;
  value: number;
}

type EveryMinute = BaseTriggerTime<"everyMinute">;
type EveryXMinutes = EveryX<"minutes">;

interface EveryHour extends BaseTriggerTime<"everyHour"> {
  minute: number; // 0 - 59
}
type EveryXHours = EveryX<"hours">;

interface EveryDay extends BaseTriggerTime<"everyDay"> {
  hour: number; // 0 - 23
  minute: number; // 0 - 59
}

interface EveryWeek extends BaseTriggerTime<"everyWeek"> {
  hour: number; // 0 - 23
  minute: number; // 0 - 59
  weekday: number; // 0 - 6(Sun - Sat)
}

interface EveryMonth extends BaseTriggerTime<"everyMonth"> {
  hour: number; // 0 - 23
  minute: number; // 0 - 59
  dayOfMonth: number; // 1 - 31
}

export type TriggerTime =
  | CustomTrigger
  | EveryMinute
  | EveryXMinutes
  | EveryHour
  | EveryXHours
  | EveryDay
  | EveryWeek
  | EveryMonth;
