import { deepCopy } from "src/utilities/helpers";

export interface GlobalState {
  defaultTimezone: string;
}

let globalState: GlobalState = { defaultTimezone: "GMT" };

export function setGlobalState(state: GlobalState) {
  globalState = state;
}

export function getGlobalState() {
  return deepCopy(globalState);
}
