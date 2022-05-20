import { useContext } from 'react'
import { DEFAULT_CIRCLE_RADIUS, NEW_SHAPE_COLOR } from './constants';
import { ShapeContext } from './shapeContext';
import { ActionType, Circle, Rectangle, ShapeType } from './types';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    maxX: number;
    maxY: number;
}

export const Controls = (props: Props) => {
    const { state, dispatch } = useContext(ShapeContext);

    const addACircle = () => {
        const newShape: Circle = {
            id: uuidv4(),
            type: ShapeType.CIRCLE,
            x: props.maxX / 2,
            y: props.maxY / 2,
            radius: DEFAULT_CIRCLE_RADIUS,
            color: NEW_SHAPE_COLOR,
            highlighted: false,
            selected: false,

        }
        dispatch({ type: ActionType.AddShape, newShape })
    }

    const addARectangle = () => {
        const newShape: Rectangle = {
            id: uuidv4(),
            type: ShapeType.RECTANGLE,
            x: props.maxX / 2,
            y: props.maxY / 2,
            width: 20,
            height: 30,
            color: NEW_SHAPE_COLOR,
            highlighted: false,
            selected: false,

        }
        dispatch({ type: ActionType.AddShape, newShape })
    }

    return (
        <div style={{flex: 1, justifyContent: 'space-evenly'}}>
            <button style={{margin: '10px'}}onClick={addACircle}>Add Circle</button>
            <button onClick={addARectangle}>Add Rectangle</button>
        </div>
    )
}
