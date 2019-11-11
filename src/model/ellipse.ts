import {
    Color,
    Dimension,
    Position,
} from './figure';

import {
    GeometricFigure,
} from './geometric';

export class Ellipse extends GeometricFigure {

    constructor(
        position: Position,
        size: Dimension,
        color: Color = { r: 255, g: 0, b: 0, a: 1 },
        lineWidth: number = 10,
        lineStyle: string = 'solid',
        protected rotation: number=0,
        protected startAngle: number=0,
        protected endAngle: number=360) {

        super( 
            position,
            size,
            color,
            lineWidth,
            lineStyle );
    }

    doPaint(
        context: CanvasRenderingContext2D ): void {

        context.lineWidth = this.lineWidth;

        context.beginPath();
        context.ellipse(
            this.position.x,
            this.position.y, 
            this.size.w,
            this.size.h,
            this.rotation,
            this.startAngle,
            this.endAngle
        );
        context.stroke();
    }
}