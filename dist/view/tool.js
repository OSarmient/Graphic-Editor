export class Tool {
    constructor() {
        this.ptPressed = null;
        this.ptReleased = null;
    }
    onMouseDown(event) {
        this.ptPressed = event;
    }
    // Template Method
    onMouseUp(event) {
        // 1. store event
        this.ptReleased = event;
        // 2. do something w/the points
        this.handleMouseReleased();
    }
}
