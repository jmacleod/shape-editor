import { AnyShape, ChangeColorAction, State } from "../../types";

export const changeColorAction = (state: State, action: ChangeColorAction) => {
    return {
        ...state,
        shapes: state.shapes.map((shape: AnyShape) => {
            if (shape.id === action.shapeId) {
                return { ...shape, color: action.color }
            }
            return shape
        })
    }
}