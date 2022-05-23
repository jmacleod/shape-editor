import { UpdateShapesAction, State } from "../../types";

export const updateShapesAction = (state: State, action: UpdateShapesAction) => {
    return {
        ...state,
        shapes: action.shapes,
    }
}