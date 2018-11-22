import * as types from "../types";

const popState = {
    // Флаги открытия попапов
    isCreatePopOpen: false,
    isEditPopOpen: false,
    // Редактируемый товар
    editedItem: null
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
                editedItem: action.payload
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