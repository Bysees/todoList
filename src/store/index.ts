import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Storage } from '@/services/Storage'
import { syncMiddleware } from './syncMiddleware'
import { todoReducer } from './reducers'
import * as actions from './actions'


const rootReducer = combineReducers({
  todo: todoReducer
})

const preloadState = Storage.getState()

// FIXME попробовать избавиться от игноров
//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  preloadState,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
  composeEnhancers(applyMiddleware(syncMiddleware))
)

type InferValuesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type ActionTypes = ReturnType<InferValuesTypes<typeof actions>>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


