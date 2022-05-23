import { AddShapeAction, State } from "../../types";

export const addShapeAction = (state: State, action: AddShapeAction) => {
    return {
        ...state,
        shapes: [...state.shapes, action.newShape],
    }
}