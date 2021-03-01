import { gpsReducer } from './gps/reducer'
import {combineReducers} from "redux";
import {createStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    gps: gpsReducer,
})

export const store = createStore( rootReducer )

export type RootState = ReturnType<typeof rootReducer>
