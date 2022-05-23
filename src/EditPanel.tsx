
import { ActionType, Circle, Rectangle, ReducerAction, Shape, ShapeType } from './types';
import { FaTrash } from "react-icons/fa/index";
import { EditPanelContainer } from './styled-components/EditPanelContainer';
import { EditPanelRow } from './styled-components/EditPanelRow';
import { EditPanelColumn } from './styled-components/EditPanelColumn';
import { MAXIMUM_CIRCLE_RADIUS, MAXIMUM_RECTANGLE_WIDTH, MINIMUM_CIRCLE_RADIUS, MINIMUM_RECTANGLE_WIDTH } from './constants';

const shapeCenter = (shape: Shape): { x: number, y: number } => {
    if (shape.type === ShapeType.CIRCLE) {
        return {
            x: Math.floor(shape.x),
            y: Math.floor(shape.y)
        }
    }
    if (shape.type === ShapeType.RECTANGLE) {
        // We store the upper left corner of the rectangle 
        // so we have to offset by 1/2 the retangle dimensions to get the center
        return {
            x: Math.floor(shape.x + ((shape as Rectangle).width / 2)),
            y: Math.floor(shape.y + ((shape as Rectangle).height / 2)),
        }
    }
    throw new Error("Unknown Shape Type")
}

type Props = {
    shape: Shape;
    dispatch: React.Dispatch<ReducerAction>
}

export const EditPanel = ({ shape, dispatch }: Props) => {
    return (
        <EditPanelContainer>
            <EditPanelRow>
                <EditPanelColumn>
                    <button onClick={() => dispatch({ type: ActionType.RemoveShape, shapeId: shape.id })}><FaTrash /> Delete</button>
                </EditPanelColumn>
                <EditPanelColumn>
                    {shape.type}
                </EditPanelColumn>
            </EditPanelRow>
            <EditPanelRow>
                <EditPanelColumn>Center x</EditPanelColumn>
                <EditPanelColumn>{shapeCenter(shape).x}</EditPanelColumn>
            </EditPanelRow>
            <EditPanelRow>
                <EditPanelColumn>Center y</EditPanelColumn>
                <EditPanelColumn>{shapeCenter(shape).y}</EditPanelColumn>
            </EditPanelRow>
            {shape.type === ShapeType.CIRCLE &&
                <EditPanelRow>
                    <EditPanelColumn>
                        Radius
                    </EditPanelColumn>
                    <EditPanelColumn>
                        <input
                            type="range"
                            min={MINIMUM_CIRCLE_RADIUS}
                            max={MAXIMUM_CIRCLE_RADIUS}
                            value={(shape as Circle).radius}
                            onChange={e => dispatch({ type: ActionType.ChangeRadius, shapeId: shape.id, radius: parseInt(e.target.value) })}
                        />
                    </EditPanelColumn>
                </EditPanelRow>
            }
            {shape.type === ShapeType.RECTANGLE &&
                <>
                    <EditPanelRow>
                        <EditPanelColumn>Width</EditPanelColumn>
                        <EditPanelColumn>
                            <input
                                type="range"
                                min={MINIMUM_RECTANGLE_WIDTH}
                                max={MAXIMUM_RECTANGLE_WIDTH}
                                value={(shape as Rectangle).width}
                                onChange={e => dispatch({ type: ActionType.ChangeWidth, shapeId: shape.id, width: parseInt(e.target.value) })}
                            />
                        </EditPanelColumn>
                    </EditPanelRow>
                    <EditPanelRow>
                        <EditPanelColumn>Height</EditPanelColumn>

                        <EditPanelColumn>
                            <input
                                type="range"
                                min={MINIMUM_RECTANGLE_WIDTH}
                                max={MAXIMUM_RECTANGLE_WIDTH}
                                value={(shape as Rectangle).height}
                                onChange={e => dispatch({ type: ActionType.ChangeHeight, shapeId: shape.id, height: parseInt(e.target.value) })}
                            />
                        </EditPanelColumn>
                    </EditPanelRow>
                </>
            }
            <EditPanelRow>
                <EditPanelColumn>Color</EditPanelColumn>
                <EditPanelColumn>
                    <input
                        type="color"
                        value={shape.color}
                        onChange={e => dispatch({ type: ActionType.ChangeColor, shapeId: shape.id, color: e.target.value })}
                    />
                </EditPanelColumn>
            </EditPanelRow>
        </EditPanelContainer>
    )
}