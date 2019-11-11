export class Figure {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
        this.selected = false;
    }
    setColor(context, color) {
        context.strokeStyle = color;
    }
    // template method
    paint(context) {
        // 1. compose color
        const color = 'rgba('
            + this.color.r
            + ','
            + this.color.g
            + ','
            + this.color.b
            + ','
            + this.color.a
            + ')';
        // 2. set color
        this.setColor(context, color);
        // 3. call abstract paint
        this.doPaint(context);
        // 4. if selected => draw bbox
        if (this.selected) {
            //            this.bbox
            //                .paint(
            //                    context
            //                )
        }
    }
}
