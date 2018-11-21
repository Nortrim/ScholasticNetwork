import * as types from "../types";

const mainState = {
    data: [
        {
            id: 0,
            name: 'Lel',
            quantity: 20,
            price: 10
        },
        {
            id: 1,
            name: 'Stich',
            quantity: 20,
            price: 10
        },
        {
            id: 2,
            name: 'Rofl',
            quantity: 20,
            price: 10
        },
        {
            id: 3,
            name: 'RSock',
            quantity: 20,
            price: 10
        },
    ],
    editId: null
};

export function mainReducer(state = mainState, action) {
    switch (action.type) {
        case types.CREATE_ITEM:
            let newItem = {
                id: state.data.length ? state.data[state.data.length - 1].id + 1 : 0,
                name: action.payload.inputName,
                quantity: action.payload.inputQuantity,
                price: 11
            };
            return {
                ...state,
                data: [...state.data, newItem]
            };
        case types.EDIT_ITEM:
            let newData = state.data;
            newData[action.payload.id] = action.payload;
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

