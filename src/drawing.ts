import { Cipher } from "crypto"
import { HIGHLIGHT_COLOR, SELECTION_COLOR } from "./constants"
import { Circle, Rectangle, Shape, ShapeType } from "./types"

export const drawRectangle = (ctx: CanvasRenderingContext2D, rectangle: Rectangle) => {
    ctx.fillStyle = rectangle.color
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
    if (rectangle.selected) {
        drawRectangleSelectionHalo(ctx, rectangle)
    } else if ( rectangle.highlighted) {
        drawRectangleHighlightedHalo(ctx, rectangle)
    }
}

export const drawRectangleSelectionHalo = (ctx: CanvasRenderingContext2D, rectangle: Rectangle) => {
    ctx.strokeStyle = SELECTION_COLOR
    ctx.lineWidth = 3
    ctx.strokeRect(rectangle.x - 5, rectangle.y - 5, rectangle.width + 10, rectangle.height + 10)
}

export const drawRectangleHighlightedHalo = (ctx: CanvasRenderingContext2D, rectangle: Rectangle) => {
    ctx.strokeStyle = HIGHLIGHT_COLOR
    ctx.lineWidth = 3
    ctx.strokeRect(rectangle.x - 5, rectangle.y - 5, rectangle.width +10 , rectangle.height + 10)
}

export const drawCircle = (ctx: CanvasRenderingContext2D, circle: Circle) => {
    ctx.fillStyle = circle.color
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI)
    ctx.fill()
    if (circle.selected) {
        drawCircleSelectionHalo(ctx, circle)
    } else if (circle.highlighted) {
        drawCircleHighlightHalo(ctx, circle)
    }
}

export const drawCircleSelectionHalo = (ctx: CanvasRenderingContext2D, circle: Circle) => {
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.radius +5, 0, 2 * Math.PI)
    ctx.lineWidth = 5
    ctx.strokeStyle = SELECTION_COLOR
    ctx.stroke()
}

export const drawCircleHighlightHalo = (ctx: CanvasRenderingContext2D, circle: Circle) => {
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.radius +5, 0, 2 * Math.PI)
    ctx.lineWidth = 5
    ctx.strokeStyle = HIGHLIGHT_COLOR
    ctx.stroke()
}

export const draw = (ctx: CanvasRenderingContext2D, shapes: Shape[]) => {
    //clear the screen
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    shapes.forEach((shape: Shape) => {
        switch (shape.type) {
            case ShapeType.CIRCLE:
                drawCircle(ctx, <Circle>shape)
                break;
            case ShapeType.RECTANGLE:
                drawRectangle(ctx, <Rectangle>shape)
                break;
            default:
                throw new Error("Unknown Shape Type");
        }
    })
}

export const detectedSelectedShapeIndex = (x: number, y: number, shapes: Shape[]): number => {

    return shapes.findIndex((shape: Shape) => {
        switch (shape.type) {
            case ShapeType.CIRCLE:
                return isWithinCircle(x, y, <Circle>shape)
            case ShapeType.RECTANGLE:
                return isWithinRectangle(x, y, <Rectangle>shape)
            default:
                throw new Error("Unknown Shape Type");
        }
    })

}

const isWithinCircle = (x: number, y: number, circle: Circle): boolean => {
    const sumOfSquaresDistance = (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);
    const radiusSquared = circle.radius * circle.radius;
    if (sumOfSquaresDistance < radiusSquared) {
        return true;
    }
    return false;
}

const isWithinRectangle = (x: number, y: number, rectangle: Rectangle): boolean => {
    if (x > rectangle.x &&
        x < rectangle.x + rectangle.width &&
        y > rectangle.y &&
        y < rectangle.y + rectangle.height
    ) {
        return true;
    }
    return false;
}


