import {
    Color,
    Dimension,
    Figure,
    Position,
} from './figure';

export class Text extends Figure {

    constructor(
        position: Position,
        size: Dimension,
        color: Color,
        protected fontName: string,
        protected fontSize: number,
        protected fontStyle: string,
        protected text: string ) {

        super( 
            position,
            size,
            color
        );
    }

    // @Override
    setColor(
        context: CanvasRenderingContext2D,
        color: string ): void {
            
        context.fillStyle = color;
    }

    doPaint(
        context: CanvasRenderingContext2D ): void {
        
        context.beginPath();
        context.rect(
            this.position.x,
            this.position.y - this.size.h,
            this.size.w,
            this.size.h
        );
  //      context.clip();

        context.font = `${this.fontStyle} ${this.fontSize}px ${this.fontName}`;

        context.fillText(
            this.text,
            this.position.x,
            this.position.y
        );
    }
}