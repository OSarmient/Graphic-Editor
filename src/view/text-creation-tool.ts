import { Figure } from '../model/figure';
import { CreationTool } from './creation-tool';
import { Text } from '../model/text';

export class TextCreationTool extends CreationTool {

    protected createFigure(ptPressed: MouseEvent | null, ptReleased: MouseEvent | null ): Figure | null {

        if ( !!ptPressed && !!ptReleased ) {

            return new Text({
                x: ptPressed.offsetX, 
                y: ptPressed.offsetY,
            },
            {
                w: ptReleased.offsetX - ptPressed.offsetX, 
                h: ptReleased.offsetY - ptPressed.offsetY,
            },
            {
                r: 0, 
                g: 0,
                b: 255,
                a: 1.0
            },
            'Arial',
            32,
            'bold',
            'HolaMundo');
        }

        return null;
    }

}