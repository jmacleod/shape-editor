

export enum ShapeType {
    RECTANGLE = 'RECTANGLE',
    CIRCLE = 'CIRCLE',
}

export type Shape = {
    id: string;
    x: number;
    y: number;
    preMoveX?: number;
    preMoveY?: number;
    color: string;
    highlighted: boolean
    selected: boolean
    type: ShapeType
}
export type Rectangle = Shape & {
    width: number;
    height: number;
}

export type Circle = Shape & {
    radius: number;
}

export type AnyShape = Circle | Rectangle

export enum ActionType {
    AddShape = 'AddShape',
    ChangeColor = 'ChangeColor',
    ChangeHeight = 'ChangeHeight',
    ChangeRadius = 'ChangeRadius',
    ChangeWidth = 'ChangeWidth',
    HighlightShapeByIndex = 'HighlightShapeByIndex',
    RemoveShape = 'RemoveShape',
    SelectShapeByIndex = 'SelectShapeByIndex',
    UnhighlightAllShapes = 'UnhighlightAllShapes',
    UnselectAllShapes = 'UnselectAllShapes',
    UpdateShapes = 'UpdateShapes',

}

type AddShapeAction = {
    type: ActionType;
    shape: AnyShape;
}
type HighlightShapeByIndexAction = {
    type: ActionType;
    higlightedShapeIndex: number;
}
type SelectShapeByIndexAction = {
    type: ActionType;
    selectedShapeIndex: number;
    multiSelect: boolean;
}
type UnselectAllShapesAction = {
    type: ActionType;
}
type UnhighlightAllShapesAction = {
    type: ActionType;
}
type UpdateShapesAction = {
    type: ActionType;
    shapes: AnyShape[];
}

export type ReducerAction = AddShapeAction |
    SelectShapeByIndexAction | 
    UnselectAllShapesAction | 
    UpdateShapesAction
