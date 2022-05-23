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
    RemoveAllShapes = 'RemoveAllShapes',
    RemoveShape = 'RemoveShape',
    SelectShapeByIndex = 'SelectShapeByIndex',
    UnhighlightAllShapes = 'UnhighlightAllShapes',
    UnselectAllShapes = 'UnselectAllShapes',
    UpdateShapes = 'UpdateShapes',

}

export type State = {
    highlightingAShape: boolean;
    shapes: AnyShape[];
}

export type AddShapeAction = {
    type: ActionType;
    newShape: AnyShape;
}

export type ChangeColorAction = {
    type: ActionType;
    shapeId: string;
    color: string;
}

export type ChangeHeightAction = {
    type: ActionType;
    shapeId: string;
    height: number;
}

export type ChangeRadiusAction = {
    type: ActionType;
    shapeId: string;
    radius: number;
}

export type HighlightShapeByIndexAction = {
    type: ActionType;
    highlightedShapeIndex: number;
}

export type RemoveAllShapesAction = {
    type: ActionType;
}

export type RemoveShapeAction = {
    type: ActionType;
    shapeId: string;
}
export type SelectShapeByIndexAction = {
    type: ActionType;
    selectedShapeIndex: number;
    multiSelect: boolean;
}

export type UnhighlightAllShapesAction = {
    type: ActionType;
}

export type UnselectAllShapesAction = {
    type: ActionType;
}

export type UpdateShapesAction = {
    type: ActionType;
    shapes: AnyShape[];
}
export type ChangeWidthAction = {
    type: ActionType;
    shapeId: string;
    width: number;
}

export type ReducerAction = (AddShapeAction |
    ChangeColorAction |
    ChangeHeightAction |
    ChangeRadiusAction |
    HighlightShapeByIndexAction | 
    RemoveShapeAction |
    SelectShapeByIndexAction | 
    UnhighlightAllShapesAction |
    UnselectAllShapesAction | 
    UpdateShapesAction |
    ChangeWidthAction
    )
