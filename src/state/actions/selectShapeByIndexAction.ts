import { AnyShape, State, SelectShapeByIndexAction } from "../../types";

export const selectShapeByIndexAction = (state: State, action: SelectShapeByIndexAction) => {
    return {
        ...state,
        shapes: state.shapes.map((shape: AnyShape, index: number) => {
            if (index === action.selectedShapeIndex) {
                return {
                    ...shape,
                    selected: !shape.selected || action.multiSelect,
                    preMoveX: shape.x,
                    preMoveY: shape.y
                }
            }
            return {
                ...shape,
                selected: shape.selected && action.multiSelect,
                preMoveX: shape.x,
                preMoveY: shape.y
            }
        })
    }
}