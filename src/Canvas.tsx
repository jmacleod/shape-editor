import React, { useRef, useEffect, useContext, useCallback, useState } from 'react'
import { detectedSelectedShapeIndex, draw } from './drawing'
import { ShapeContext } from './shapeContext';
import { ActionType, Shape } from './types';


type Props = {
    height: string;
    width: string;
    isMultiSelectActive: boolean;
}

export const Canvas = (props: Props) => {

    const { state, dispatch } = useContext(ShapeContext);
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [isMouseDown, setIsMouseDown] = useState(false)
    const [startMoveCoordinates, setStartMoveCoordinates] = useState({ x: 0, y: 0 })

    const handleMouseMove = (event: React.MouseEvent) => {
        const bound = canvasRef.current?.getBoundingClientRect()
        const x = event.clientX - (bound?.left || 0) - (canvasRef.current?.clientLeft || 0)
        const y = event.clientY - (bound?.top || 0) - (canvasRef.current?.clientTop || 0)

        const highlightedShapeIndex = detectedSelectedShapeIndex(x, y, state.shapes)
        if (highlightedShapeIndex === -1) {  // findIndex returns -1 if it doesn't find it
            if (state.highlightingAShape) {
                dispatch({ type: ActionType.UnhighlightAllShapes })
            }
        } else {
            dispatch({ type: ActionType.HighlightShapeByIndex, highlightedShapeIndex })
        }

        if (!isMouseDown) {
            return
        }

        const deltaX = x - startMoveCoordinates.x
        const deltaY = y - startMoveCoordinates.y
        const updatedShapes = state.shapes
            .map((shape: Shape) => {
                if (shape.selected) {
                    shape.x = (shape.preMoveX || shape.x) + deltaX
                    shape.y = (shape.preMoveY || shape.y) + deltaY
                }
                return shape
            })

        dispatch({ type: ActionType.UpdateShapes, shapes: updatedShapes })


    }

    const handleMouseDown = (event: React.MouseEvent) => {
        const bound = canvasRef.current?.getBoundingClientRect()
        const x = event.clientX - (bound?.left || 0) - (canvasRef.current?.clientLeft || 0)
        const y = event.clientY - (bound?.top || 0) - (canvasRef.current?.clientTop || 0)
        console.log("MOUSE DOWN: ", x, " : ", y)
        setIsMouseDown(true)
        setStartMoveCoordinates({ x, y })

        // detect if we are on a shape
        // add to selected shapes if multiselect active, otherwise replace selected shaes
        // if not on a shape, clear selected shapes
        const selectedShapeIndex = detectedSelectedShapeIndex(x, y, state.shapes)
        console.log("SELECTED SHAPE INDEX: ", selectedShapeIndex)

        if (selectedShapeIndex === -1) {  // findIndex returns -1 if it doesn't find it
            // we clicked somewhere not on a shape
            dispatch({ type: ActionType.UnselectAllShapes })
        } else {
            dispatch({ type: ActionType.SelectShapeByIndex, selectedShapeIndex, multiSelect: props.isMultiSelectActive })

        }
    }

    const handleMouseUp = (event: React.MouseEvent) => {
        setIsMouseDown(false)
    }

    useEffect(() => {

        const canvas = canvasRef.current
        //@ts-ignore
        const context = canvas.getContext('2d') || new CanvasRenderingContext2D()
        let animationFrameId: number

        const render = () => {
            draw(context, state.shapes)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [state])


    const color = props.isMultiSelectActive ? "Red" : "Blue"

    return (
        <div style={{borderStyle: 'solid', flex:1}}>
            <canvas
                ref={canvasRef}
                onMouseDown={(event) => handleMouseDown(event)}
                onMouseUp={(event) => handleMouseUp(event)}
                onMouseMove={(event) => handleMouseMove(event)}
                width={props.width}
                height={props.height}
            />
        </div>
    )
}


