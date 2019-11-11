import { Tool } from './tool';
import { App } from '../controller/app';
import { Figure } from '../model/figure';

export abstract class CreationTool extends Tool {

    protected abstract createFigure(
        ptPressed: MouseEvent | null,
        ptReleased: MouseEvent | null ): Figure | null;

    // Template Method
    protected handleMouseReleased(): void {

        // 1. check if equal
        const equals: boolean = !!this.ptPressed
            && !!this.ptReleased 
            && this.ptPressed.clientX 
            === this.ptReleased.clientX 
            && this.ptPressed.clientY 
            === this.ptReleased.clientY;

        if ( equals ) {
            // NOOP
        }
        else {
            // figure creation
            // 1. create bbox
            // 2. maybe normalize bbox

            // 3. create object
            const f: Figure | null = this.createFigure(
                this.ptPressed,
                this.ptReleased
            );

            // 4. check figure
            if ( !!f ) {
                // 5. => App
                App.getInstance()
                    .addFigure(
                        f
                    );
            }
        }
    };

}