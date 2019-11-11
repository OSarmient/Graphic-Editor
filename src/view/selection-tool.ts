import { Tool } from './tool';
import { App } from '../controller/app';

export class SelectionTool extends Tool {

    protected handleMouseReleased(): void {

        const equals: boolean = !!this.ptPressed
            && !!this.ptReleased 
            && this.ptPressed.offsetX === this.ptReleased.offsetX 
            && this.ptPressed.offsetY === this.ptReleased.offsetY;

        if ( equals ) {
            // point selection
            App.getInstance()
                .selectPoint(
                    this.ptReleased
                );
        }
        else {
            // bound box selection
            // 1. create bbox
            // 2. normalize bbox
            // 3. => App
        }
    };
}