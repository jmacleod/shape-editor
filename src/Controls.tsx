import { useContext } from 'react'
import {
    MAXIMUM_CIRCLE_RADIUS,
    MAXIMUM_RECTANGLE_HEIGHT,
    MAXIMUM_RECTANGLE_WIDTH,
    MINIMUM_CIRCLE_RADIUS,
    MINIMUM_RECTANGLE_HEIGHT,
    MINIMUM_RECTANGLE_WIDTH
} from './constants';
import { StateContext } from './state/StateContext';
import { ActionType, Circle, Rectangle, ShapeType } from './types';
import { v4 as uuidv4 } from 'uuid';
import { ControlsContainer } from './styled-components/ControlsContainer';

type Props = {
    maxX: number;
    maxY: number;
}

export const Controls = (props: Props) => {
    const { dispatch } = useContext(StateContext);

    const addACircle = () => {
        const newShape: Circle = {
            id: uuidv4(),
            type: ShapeType.CIRCLE,
            x: Math.random() * (props.maxX - 20) + 20,
            y: Math.random() * (props.maxY - 20) + 20,
            radius: Math.random() * (MAXIMUM_CIRCLE_RADIUS / 2) + MINIMUM_CIRCLE_RADIUS,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            highlighted: false,
            selected: false,

        }
        dispatch({ type: ActionType.AddShape, newShape })
    }

    const addARectangle = () => {
        const newShape: Rectangle = {
            id: uuidv4(),
            type: ShapeType.RECTANGLE,
            x: Math.random() * (props.maxX - 20) + 20,
            y: Math.random() * (props.maxY - 20) + 20,
            width: Math.random() * (MAXIMUM_RECTANGLE_WIDTH / 2) + MINIMUM_RECTANGLE_WIDTH,
            height: Math.random() * (MAXIMUM_RECTANGLE_HEIGHT / 2) + MINIMUM_RECTANGLE_HEIGHT,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            highlighted: false,
            selected: false,

        }
        dispatch({ type: ActionType.AddShape, newShape })
    }

    const removeAllShapes = () => {
        dispatch({ type: ActionType.RemoveAllShapes })

    }

    return (
        <ControlsContainer>
            <button style={{ margin: '10px' }} onClick={addACircle}>Add Circle</button>
            <button style={{ margin: '10px' }} onClick={addARectangle}>Add Rectangle</button>
            <button style={{ margin: '10px' }} onClick={removeAllShapes}>Reset</button>
        </ControlsContainer>
    )
}