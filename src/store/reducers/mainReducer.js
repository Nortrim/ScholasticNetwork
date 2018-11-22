import * as types from "../types";

const mainState = {
    data: []
};

export function mainReducer(state = mainState, action) {
    switch (action.type) {
        case types.SET_DATA:
            return {
                ...state,
                data: action.payload
            };
        case types.CREATE_ITEM:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case types.EDIT_ITEM:
            let newData = Object.assign([], state.data);
            newData.forEach(el => {
                if(el.id === action.payload.id) {
                    el = action.payload
                }
            });
            return {
                ...state,
                data: newData
            };
        case types.DELETE_ITEM:
            return {
                ...state,
                data: state.data.filter(item => item.id !== action.payload)
            };
        default: return state
    }
}

