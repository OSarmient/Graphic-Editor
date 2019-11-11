import { Figure } from '../model/figure';
import { Line } from '../model/line';
import { CreationTool } from './creation-tool';

export class LineCreationTool extends CreationTool {

    protected createFigure(
        ptPressed: MouseEvent | null,
        ptReleased: MouseEvent | null ): Figure | null {

        if ( !!ptPressed && !!ptReleased ) {

            return new Line({
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