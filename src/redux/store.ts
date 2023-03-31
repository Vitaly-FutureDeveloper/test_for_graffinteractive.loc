import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";

import listReducer from "./list-reducer/list-reducer";

const reducers = combineReducers({
	listReducer
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;


export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<A extends Action, R=Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;


// @ts-ignore
const store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;