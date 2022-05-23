import { AnyShape, ChangeRadiusAction, State } from "../../types";

export const changeRadiusAction = (state: State, action: ChangeRadiusAction) => {
  return {
    ...state,
    shapes: state.shapes.map((shape: AnyShape) => {
      if (shape.id === action.shapeId) {
        return { ...shape, radius: action.radius }
      }
      return shape
    })
  }
}