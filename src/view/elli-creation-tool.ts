import { Figure } from '../model/figure';
import { Ellipse } from '../model/ellipse';
import { CreationTool } from './creation-tool';

export class ElliCreationTool extends CreationTool {

    protected createFigure(
        ptPressed: MouseEvent | null,
        ptReleased: MouseEvent | null ): Figure | null {

        if ( !!ptPressed && !!ptReleased ) {

            return new Ellipse({
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