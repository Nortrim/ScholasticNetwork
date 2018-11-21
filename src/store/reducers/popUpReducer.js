import * as types from "../types";

const popState = {
    isCreatePopOpen: false,
    isEditPopOpen: false,
    editId: null
};

export function popUpReducer(state = popState, action) {
    switch (action.type) {
        case types.OPEN_CREATE_POP:
            return {
                ...state,
                isCreatePopOpen: true
            };
        case types.OPEN_EDIT_POP:
            return {
                ...state,
                isEditPopOpen: true,
                editId: action.payload
            };
        case types.CLOSE_POPS:
            return {
                ...state,
                isCreatePopOpen: false,
                isEditPopOpen: false
            };
        default: return state
    }
}