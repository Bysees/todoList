import { Middleware } from "redux";
import { ActionTypes, RootState } from "@/store";
import { Storage } from "@/services/Storage";

export const syncMiddleware : Middleware<{}, RootState> = (store) => (next) => (action: ActionTypes) => {
  const nextAction = next(action)
  const state = store.getState()
  Storage.setState(state)
  return nextAction
}