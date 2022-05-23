import { RemoveShapeAction, Shape, State } from "../../types";

export const removeShapeAction = (state: State, action: RemoveShapeAction) => {
    const index = state.shapes.findIndex((shape: Shape) => shape.id === action.shapeId)
    return {
        ...state,
        shapes: [...state.shapes.slice(0, index), ...state.shapes.slice(index + 1)],
    }
}