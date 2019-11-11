import { Figure } from '../model/figure';
import { Rectangle } from '../model/rectangle';
import { CreationTool } from './creation-tool';

export class RectCreationTool extends CreationTool {

    protected createFigure(
        ptPressed: MouseEvent | null,
        ptReleased: MouseEvent | null ): Figure | null {

        if ( !!ptPressed && !!ptReleased ) {

            return new Rectangle({
                x: ptPressed.offsetX,
                y: ptPressed.offsetY,
            }, {
                w: ptReleased.offsetX - ptPressed.offsetX,
                h: ptReleased.offsetY - ptPressed.offsetY,
            });
        }

        return null;
    }
}