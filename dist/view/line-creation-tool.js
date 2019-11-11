import { Line } from '../model/line';
import { CreationTool } from './creation-tool';
export class LineCreationTool extends CreationTool {
    createFigure(ptPressed, ptReleased) {
        if (!!ptPressed && !!ptReleased) {
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
