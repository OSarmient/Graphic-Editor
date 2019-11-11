import {
    Color,
    Dimension,
    Figure,
    Position,
} from './figure';

export abstract class GeometricFigure extends Figure {
    
    constructor(
        position: Position,
        size: Dimension,
        color: Color,
        protected lineWidth: number,
        protected lineStyle: string) {

        super( 
            position,
            size,
            color
        );
    }
}