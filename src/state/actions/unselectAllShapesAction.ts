import { AnyShape, State, UnselectAllShapesAction } from "../../types";

export const unselectAllShapesAction = (state: State, action: UnselectAllShapesAction) => {
    return {
        ...state,
        shapes: state.shapes.map((shape: AnyShape) => { return { ...shape, selected: false } }),
    }
}