export abstract class Tool {

    protected abstract handleMouseReleased(): void;

    protected ptPressed: MouseEvent | null = null; 
    protected ptReleased: MouseEvent | null = null;
    
    onMouseDown(
        event: MouseEvent ): void {

        this.ptPressed = event;
    }

    // Template Method
    onMouseUp(
        event: MouseEvent ): void {

        // 1. store event
        this.ptReleased = event;

        // 2. do something w/the points
        this.handleMouseReleased();
    }
}