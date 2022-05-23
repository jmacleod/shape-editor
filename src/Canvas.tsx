import React, { useRef, useEffect, useContext, useState } from 'react'
import { detectedSelectedShapeIndex, draw } from './drawing'
import { StateContext } from './state/StateContext';
import { CanvasContainer } from './styled-components/CanvasContainer';
import { ActionType, AnyShape } from './types';

type Props = {
    height: string;
    width: string;
    isMultiSelectActive: boolean;
}

export const Canvas = (props: Props) => {

    const { state, dispatch } = useContext(StateContext);
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
        const updatedShapes: AnyShape[] = state.shapes
            .map((shape: AnyShape) => {
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
        setIsMouseDown(true)
        setStartMoveCoordinates({ x, y })

        const selectedShapeIndex = detectedSelectedShapeIndex(x, y, state.shapes)

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

    return (
        <CanvasContainer>
            <canvas
                ref={canvasRef}
                onMouseDown={(event) => handleMouseDown(event)}
                onMouseUp={(event) => handleMouseUp(event)}
                onMouseMove={(event) => handleMouseMove(event)}
                width={props.width}
                height={props.height}
            />
        </CanvasContainer>
    )
}


