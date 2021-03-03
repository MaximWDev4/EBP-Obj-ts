import { gpsReducer } from './gps/reducer'
import {combineReducers} from "redux";
import {createStore} from "@reduxjs/toolkit";
import {stateType1, stateType2} from "./types";
import {systemReducer} from "./system/reducer";

export const rootReducer = combineReducers({
    gps: gpsReducer as () => stateType2,
    system: systemReducer as () => stateType1,

})

export const store = createStore( rootReducer )

export type RootState = ReturnType<typeof rootReducer>
