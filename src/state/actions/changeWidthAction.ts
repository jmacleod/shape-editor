import { AnyShape, ChangeWidthAction, State } from "../../types";

export const changeWidthAction = (state: State, action: ChangeWidthAction) => {
  return {
    ...state,
    shapes: state.shapes.map((shape: AnyShape) => {
      if (shape.id === action.shapeId) {
        return { ...shape, width: action.width, }
      }
      return shape
    })
  }
}