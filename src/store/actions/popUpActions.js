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

export const openEditPop = (editId) => {
    return {
        type: types.OPEN_EDIT_POP,
        payload: editId
    }
};
//




// import * as types from "./const";
//
// const initialState = {
//     createPopIsOpen: false,
//     editPopIsOpen: false
// };
//
// export function rootReducer(state, action) {
//     switch (action.type) {
//         case types.CREATE_ITEM:
//             let newItem = {
//                 id: state.data.length,
//                 name: action.payload.inputName,
//                 quantity: action.payload.inputQuantity,
//                 price: 11
//             };
//             return {
//                 ...state,
//                 data: state.data.push(newItem)
//             };
//         case types.OPEN_CREATE_POP:
//             return {
//                 ...state,
//                 createPopIsOpen: true
//             };
//         case types.OPEN_EDIT_POP:
//             return {
//                 ...state,
//                 editPopIsOpen: true
//             };
//         case types.CLOSE_POPS:
//             return {
//                 ...state,
//                 createPopIsOpen: false,
//                 editPopIsOpen: false
//             };
//         default: return state
//     }
// }