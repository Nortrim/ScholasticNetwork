import * as types from "../types";

export const closePop = () => {
    return {
        type: types.CLOSE_POPS
    }
};

export const openCreatePop = () => {
    return {
        type: types.OPEN_CREATE_POP
    }
};

export const openEditPop = (editItem) => {
    return {
        type: types.OPEN_EDIT_POP,
        payload: editItem
    }
};