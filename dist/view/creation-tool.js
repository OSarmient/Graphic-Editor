import { Tool } from './tool';
import { App } from '../controller/app';
export class CreationTool extends Tool {
    // Template Method
    handleMouseReleased() {
        // 1. check if equal
        const equals = !!this.ptPressed
            && !!this.ptReleased
            && this.ptPressed.clientX
                === this.ptReleased.clientX
            && this.ptPressed.clientY
                === this.ptReleased.clientY;
        if (equals) {
            // NOOP
        }
        else {
            // figure creation
            // 1. create bbox
            // 2. maybe normalize bbox
            // 3. create object
            const f = this.createFigure(this.ptPressed, this.ptReleased);
            // 4. check figure
            if (!!f) {
                // 5. => App
                App.getInstance()
                    .addFigure(f);
            }
        }
    }
    ;
}
