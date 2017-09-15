import { ActionReducer, Action } from '@ngrx/store';


export const ActionType = {
    User: "User",
    Nouser: "Nouser",
    Register:"Register"
};


export function Reducer(state: any, action: { type: string, payload?: any }) {
    console.log("action.type", action.type);
    console.log("action.payload", action.payload)
    switch (action.type) {
        case ActionType.User:
            console.log("action.payload", action.payload)
            return action.payload;
        case ActionType.Nouser:
            console.log("action.payload", 'logout success', action.payload)
            return action.payload;
        case ActionType.Register:
            console.log("action.payload", 'registeration success', action.payload)
            return action.payload;
        default:
            return state;
    }
}