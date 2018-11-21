import * as types from "../types";

export const actionCreate = (newItem) => {
    return {
        type: types.CREATE_ITEM,
        payload: newItem
    }
};

export const actionEdit = (editedItem) => {
    return {
        type: types.EDIT_ITEM,
        payload: editedItem
    }
};

export const actionDelete = (id) => {
    return {
        type: types.DELETE_ITEM,
        payload: id
    }
};