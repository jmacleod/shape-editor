import { useReducer, createContext, Reducer } from "react";
import { 
  ActionType, 
  AddShapeAction, 
  ChangeColorAction, 
  ChangeHeightAction, 
  ChangeRadiusAction, 
  ChangeWidthAction, 
  HighlightShapeByIndexAction, 
  ReducerAction, 
  RemoveAllShapesAction, 
  RemoveShapeAction, 
  SelectShapeByIndexAction, 
  State, 
  UnhighlightAllShapesAction, 
  UnselectAllShapesAction, 
  UpdateShapesAction } from "../types";
import { addShapeAction } from "./actions/addShape";
import { changeColorAction } from "./actions/changeColorAction";
import { changeHeightAction } from "./actions/changeHeightAction";
import { changeWidthAction } from "./actions/changeWidthAction";
import { changeRadiusAction } from "./actions/changeRadiusAction";
import { removeShapeAction } from "./actions/removeShape";
import { selectShapeByIndexAction } from "./actions/selectShapeByIndexAction";
import { unselectAllShapesAction } from "./actions/unselectAllShapesAction";
import { updateShapesAction } from "./actions/updateShapesAction";
import { unhighlightAllShapesAction } from "./actions/unhighlightAllShapesAction";
import { highlightShapeByIndexAction } from "./actions/highlightShapeByIndexAction";
import { removeAllShapesAction } from "./actions/removeAllShapes";


type Props = {
  children: React.ReactNode;
};

const initialState: State = {
  highlightingAShape: false,
  shapes: [],
}

export const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<ReducerAction>;
}>({
  state: initialState,
  dispatch: () => null
});


const reducer: Reducer<State, ReducerAction> = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case ActionType.AddShape:
      return addShapeAction(state, action as AddShapeAction)
    case ActionType.RemoveAllShapes:
      return removeAllShapesAction(state, action as RemoveAllShapesAction)
    case ActionType.RemoveShape:
      return removeShapeAction(state, action as RemoveShapeAction)
    case ActionType.UpdateShapes:
      return updateShapesAction(state, action as UpdateShapesAction)
    case ActionType.ChangeRadius:
      return changeRadiusAction(state, action as ChangeRadiusAction)
    case ActionType.ChangeWidth:
      return changeWidthAction(state, action as ChangeWidthAction)
    case ActionType.ChangeHeight:
      return changeHeightAction(state, action as ChangeHeightAction)
    case ActionType.ChangeColor:
      return changeColorAction(state, action as ChangeColorAction)
    case ActionType.UnselectAllShapes:
      return unselectAllShapesAction(state, action as UnselectAllShapesAction)
    case ActionType.SelectShapeByIndex:
      return selectShapeByIndexAction(state, action as SelectShapeByIndexAction)
    case ActionType.UnhighlightAllShapes:
      return unhighlightAllShapesAction(state, action as UnhighlightAllShapesAction)
    case ActionType.HighlightShapeByIndex:
      return highlightShapeByIndexAction(state, action as HighlightShapeByIndexAction)
    default:
      throw new Error("Unknown Reducer Action");
  }
}

export const StateContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
