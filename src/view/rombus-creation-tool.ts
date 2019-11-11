import { Figure } from '../model/figure';
import { CreationTool } from './creation-tool';
import { Rombus } from '../model/rombus';

export class RombusCreationTool extends CreationTool {

    protected createFigure(ptPressed: MouseEvent | null, ptReleased: MouseEvent | null ): Figure | null {

        if ( !!ptPressed && !!ptReleased ) {

            return new Rombus({
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