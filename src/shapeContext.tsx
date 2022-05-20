import { useReducer, createContext, Reducer } from "react";
import { ActionType, AnyShape, ShapeType, ReducerAction, Rectangle, Shape } from "./types";

type State = {
  highlightingAShape: boolean;
  shapes: AnyShape[];
}


type Props = {
  children: React.ReactNode;
};

const initialState: State = {
  highlightingAShape: false,
  shapes: [],
}

export const ShapeContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});


const reducer: Reducer<State, ReducerAction> = (state: State, action: any): State => {
  switch (action.type) {
    // TODO: cases into an enum or something
    case ActionType.AddShape:
      return {
        ...state,
        shapes: [...state.shapes, action.newShape],
      };
    case ActionType.RemoveShape:
      const index = state.shapes.findIndex((shape:Shape) => shape.id === action.shapeId )
      return {
        ...state,
        shapes: [...state.shapes.slice(0, index), ...state.shapes.slice(index + 1)],
      };
    case ActionType.UpdateShapes:
      return {
        ...state,
        shapes: action.shapes,
      };
    case ActionType.ChangeRadius:
      return {
        ...state,
        shapes: state.shapes.map((shape: AnyShape) => {
          if (shape.id === action.shapeId) {
            console.log("change radius: ", action.shapeId)
            return { ...shape, radius: action.radius }
          }
          return shape
        })
      };
    case ActionType.ChangeWidth:
      return {
        ...state,
        shapes: state.shapes.map((shape: AnyShape) => {
          if (shape.id === action.shapeId) {
            console.log("change width: ", action.width)
            return { ...shape, width: action.width, }
          }
          return shape
        })
      };
    case ActionType.ChangeHeight:
      return {
        ...state,
        shapes: state.shapes.map((shape: AnyShape) => {
          if (shape.id === action.shapeId) {
            console.log("change height: ", action.height)
            return { ...shape, height: action.height, }
          }
          return shape
        })
      };
    case ActionType.ChangeColor:
      return {
        ...state,
        shapes: state.shapes.map((shape: AnyShape) => {
          if (shape.id === action.shapeId) {
            console.log("change color: ", action.shapeId)
            return { ...shape, color: action.color }
          }
          return shape
        })
      };
    case ActionType.UnselectAllShapes:
      return {
        ...state,
        shapes: state.shapes.map((shape: AnyShape) => { return { ...shape, selected: false } }),
      };
    case ActionType.SelectShapeByIndex:
      console.log("Selected: ", action.selectedShapeIndex)
      return {
        ...state,
        shapes: state.shapes.map((shape: AnyShape, index: number) => {
          if (index === action.selectedShapeIndex) {
            console.log("poop: ", index)
            return { ...shape, selected: !shape.selected || action.multiSelect, preMoveX: shape.x, preMoveY: shape.y }
          }
          return { ...shape, selected: shape.selected && action.multiSelect, preMoveX: shape.x, preMoveY: shape.y }
        })
      };

    case ActionType.UnhighlightAllShapes:
      console.log("unhighlighting")
      return {
        ...state,
        highlightingAShape: false,
        shapes: state.shapes.map((shape: AnyShape) => { return { ...shape, highlighted: false } }),
      };
    case ActionType.HighlightShapeByIndex:
      console.log("highlighted: ", action.highlightedShapeIndex)
      return {
        ...state,
        highlightingAShape: true,
        shapes: state.shapes.map((shape: AnyShape, index: number) => {
          if (index === action.highlightedShapeIndex) {
            console.log("highlighted index: ", index)
            return { ...shape, highlighted: true, }
          }
          return { ...shape, highlighted: false, preMoveX: shape.x, preMoveY: shape.y }
        })
      };
    default:
      throw new Error("Unknown Reducer Action");
  }
}

export const ShapeContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ShapeContext.Provider value={{ state, dispatch }}>
      {children}
    </ShapeContext.Provider>
  );
};
