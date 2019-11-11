import { CreationTool } from './creation-tool';
import { Triangle } from '../model/triangle';
export class TriangleCreationTool extends CreationTool {
    createFigure(ptPressed, ptReleased) {
        if (!!ptPressed && !!ptReleased) {
            return new Triangle({
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
