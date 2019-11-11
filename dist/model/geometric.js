import { Figure, } from './figure';
export class GeometricFigure extends Figure {
    constructor(position, size, color, lineWidth, lineStyle) {
        super(position, size, color);
        this.lineWidth = lineWidth;
        this.lineStyle = lineStyle;
    }
}
