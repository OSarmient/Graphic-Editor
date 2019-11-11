import { GeometricFigure, } from './geometric';
export class Ellipse extends GeometricFigure {
    constructor(position, size, color = { r: 255, g: 0, b: 0, a: 1 }, lineWidth = 10, lineStyle = 'solid', rotation = 0, startAngle = 0, endAngle = 360) {
        super(position, size, color, lineWidth, lineStyle);
        this.rotation = rotation;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
    doPaint(context) {
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.ellipse(this.position.x, this.position.y, this.size.w, this.size.h, this.rotation, this.startAngle, this.endAngle);
        context.stroke();
    }
}
