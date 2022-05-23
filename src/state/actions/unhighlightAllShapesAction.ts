import { AnyShape, State, UnhighlightAllShapesAction } from "../../types";

export const unhighlightAllShapesAction = (state: State, action: UnhighlightAllShapesAction) => {
    return {
        ...state,
        highlightingAShape: false,
        shapes: state.shapes.map((shape: AnyShape) => { return { ...shape, highlighted: false } }),
    }
}