import { gpsReducer } from './gps/reducer'
import {combineReducers} from "redux";
import {createStore} from "@reduxjs/toolkit";
import {stateType} from "./types";

export const rootReducer = combineReducers({
    gps: gpsReducer as () => stateType
})

export const store = createStore( rootReducer )

export type RootState = ReturnType<typeof rootReducer>
