import { GeometricFigure, } from './geometric';
export class Rectangle extends GeometricFigure {
    constructor(position, size, color = { r: 255, g: 0, b: 0, a: 1 }, lineWidth = 10, lineStyle = 'solid') {
        super(position, size, color, lineWidth, lineStyle);
    }
    doPaint(context) {
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.rect(this.position.x, this.position.y, this.size.w, this.size.h);
        context.stroke();
    }
}
