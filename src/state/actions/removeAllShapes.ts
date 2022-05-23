import { RemoveAllShapesAction, State } from "../../types";

export const removeAllShapesAction = (state: State, action: RemoveAllShapesAction) => {
    return {
        ...state,
        shapes: [],
    }
}