import { combineReducers } from 'redux';
import { popUpReducer } from './popUpReducer'
import { mainReducer } from "./mainReducer";

export const rootReducer = combineReducers({
    mainReducer: mainReducer,
    popUpReducer: popUpReducer
});
