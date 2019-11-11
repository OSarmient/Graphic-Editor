import { GeometricFigure, } from './geometric';
export class Line extends GeometricFigure {
    constructor(position, size, color = { r: 255, g: 0, b: 0, a: 1 }, lineWidth = 10, lineStyle = 'solid') {
        super(position, size, color, lineWidth, lineStyle);
    }
    doPaint(context) {
        context.lineWidth = this.lineWidth;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x + this.size.w, this.position.y + this.size.h);
        context.stroke();
    }
}
