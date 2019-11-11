import {
    Color,
    Dimension,
    Position,
} from './figure';

import {
    GeometricFigure,
} from './geometric';

export class Rectangle extends GeometricFigure {

    constructor(
        position: Position,
        size: Dimension,
        color: Color = { r: 255, g: 0, b: 0, a: 1 },
        lineWidth: number = 10,
        lineStyle: string = 'solid'
          ) {

        super( 
            position,
            size,
            color,
            lineWidth,
            lineStyle
        );
    }

    doPaint(
        context: CanvasRenderingContext2D ): void {

        context.lineWidth = this.lineWidth;

        context.beginPath();
        context.rect(
            this.position.x,
            this.position.y, 
            this.size.w,
            this.size.h
        );
        context.stroke();
    }
}