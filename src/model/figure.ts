export interface Position {
    x: number;
    y: number;
}

export interface Dimension {
    w: number;
    h: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export abstract class Figure {
    abstract doPaint( 
        context: CanvasRenderingContext2D ): void;

    
    protected selected: boolean = false;

    constructor(
        protected position: Position,
        protected size: Dimension,
        protected color: Color ) {
    }

    protected setColor(
        context: CanvasRenderingContext2D,
        color: string ): void {

        context.strokeStyle = color;
    }

    // template method
    paint(
        context: CanvasRenderingContext2D ): void {

        // 1. compose color
        const color: string = 'rgba('
            + this.color.r
            + ','
            + this.color.g
            + ','
            + this.color.b
            + ','
            + this.color.a
            + ')';

        // 2. set color
        this.setColor(
            context,
            color
        );

        // 3. call abstract paint
        this.doPaint(
            context
        );
        
        // 4. if selected => draw bbox
        if ( this.selected ) {
//            this.bbox
//                .paint(
//                    context
//                )
        }
    }
}