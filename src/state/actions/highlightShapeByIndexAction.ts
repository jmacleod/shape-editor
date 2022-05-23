import { AnyShape, HighlightShapeByIndexAction, State } from "../../types";

export const highlightShapeByIndexAction = (state: State, action: HighlightShapeByIndexAction) => {
    return {
        ...state,
        highlightingAShape: true,
        shapes: state.shapes.map((shape: AnyShape, index: number) => {
            if (index === action.highlightedShapeIndex) {
                return { ...shape, highlighted: true, }
            }
            return { ...shape, highlighted: false, preMoveX: shape.x, preMoveY: shape.y }
        })
    }
}