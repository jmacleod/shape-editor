import { useRef, useEffect, useContext } from 'react'
import { DEFAULT_CIRCLE_RADIUS } from './constants';
import { ShapeContext } from './shapeContext';
import { ActionType, AnyShape, Circle, Rectangle, Shape, ShapeType } from './types';

type Props = {

}

const shapeCenter = (shape: Shape): { x: number, y: number } => {
    if (shape.type === ShapeType.CIRCLE) {
        return { x: shape.x, y: shape.y }
    }
    if (shape.type === ShapeType.RECTANGLE) {
        return {
            x: shape.x + ((shape as Rectangle).width / 2),
            y: shape.y + ((shape as Rectangle).height / 2),
        }
    }
    throw new Error("Unknown Shape Type")
}

export const Editor = (props: Props) => {
    const { state, dispatch } = useContext(ShapeContext);
    console.log("EDITOR: ", state.shapes)
    const editPanels = state.shapes
        .filter((shape: Shape) => shape.selected)
        .map((shape: Shape) => {
            return (
                <div style={{ borderStyle: 'solid', display: 'flex', flexDirection: 'column' }} key={shape.id}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button onClick={() => dispatch({ type: ActionType.RemoveShape, shapeId: shape.id })}>Remove Shape</button>
                        <div >{shape.type}</div>
                    </div>
                    <div >Center x {shapeCenter(shape).x}</div>
                    <div >Center y {shapeCenter(shape).y}</div>
                    {shape.type === ShapeType.CIRCLE &&
                        <div>
                            <input
                                type="range"
                                min="5" max="250"
                                value={(shape as Circle).radius}
                                onChange={e => dispatch({ type: ActionType.ChangeRadius, shapeId: shape.id, radius: parseInt(e.target.value) })}
                            />
                        </div>
                    }
                    {shape.type === ShapeType.RECTANGLE &&
                        <>
                            <input
                                type="range"
                                min="10" max="300"
                                value={(shape as Rectangle).width}
                                onChange={e => dispatch({ type: ActionType.ChangeWidth, shapeId: shape.id, width: parseInt(e.target.value) })}
                            />
                            <input
                                type="range"
                                min="10" max="300"
                                value={(shape as Rectangle).height}
                                onChange={e => dispatch({ type: ActionType.ChangeHeight, shapeId: shape.id, height: parseInt(e.target.value) })}
                            />
                        </>
                    }
                    <input
                        type="color"
                        value={shape.color}
                        onChange={e => dispatch({ type: ActionType.ChangeColor, shapeId: shape.id, color: e.target.value })}></input>
                </div>
            )

        })
    return (
        <div style={{ flex: 2, paddingLeft: '15px', flexGrow: 5, overflowY: 'scroll' }}>
            {editPanels}
        </div>
    )
}
