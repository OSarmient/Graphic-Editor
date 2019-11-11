import { CreationTool } from './creation-tool';
import { Rombus } from '../model/rombus';
export class RombusCreationTool extends CreationTool {
    createFigure(ptPressed, ptReleased) {
        if (!!ptPressed && !!ptReleased) {
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
