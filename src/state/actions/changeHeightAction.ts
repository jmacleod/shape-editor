import { AnyShape, ChangeHeightAction, State } from "../../types";

export const changeHeightAction = (state: State, action: ChangeHeightAction) => {
  return {
    ...state,
    shapes: state.shapes.map((shape: AnyShape) => {
      if (shape.id === action.shapeId) {
        return { ...shape, height: action.height, }
      }
      return shape
    })
  }
}