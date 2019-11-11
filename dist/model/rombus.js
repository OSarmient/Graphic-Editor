import { GeometricFigure, } from './geometric';
export class Rombus extends GeometricFigure {
    constructor(position, size, color = { r: 56, g: 255, b: 0, a: 1 }, lineWidth = 10, lineStyle = 'solid') {
        super(position, size, color, lineWidth, lineStyle);
    }
    doPaint(context) {
        context.lineWidth = this.lineWidth;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(this.position.x + (this.size.w / 2), this.position.y);
        context.lineTo(this.position.x + this.size.w, this.position.y + (this.size.h / 2));
        context.moveTo(this.position.x + (this.size.w / 2), this.position.y + this.size.h);
        context.lineTo(this.position.x + this.size.w, this.position.y + (this.size.h / 2));
        context.moveTo(this.position.x, this.position.y + this.size.h / 2);
        context.lineTo(this.position.x + this.size.w / 2, this.position.y + this.size.h);
        context.moveTo(this.position.x, this.position.y + this.size.h / 2);
        context.lineTo(this.position.x + this.size.w / 2, this.position.y + this.size.h / (this.size.h * 2));
        context.stroke();
    }
}
