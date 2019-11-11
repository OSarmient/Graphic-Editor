import { App } from '../controller/app';
import { LineCreationTool } from './line-creation-tool';
import { RectCreationTool } from './rect-creation-tool';
import { SelectionTool } from './selection-tool';
import { RombusCreationTool } from './rombus-creation-tool';
import { ElliCreationTool } from './elli-creation-tool';
import { TriangleCreationTool } from './triangle-creation-tool';
import { TextCreationTool } from './text-creation-tool';
export class MainWindow {
    constructor() {
        this.tools = [];
        this.activeTool = null;
        this.canvas = document.getElementById('my-canvas');
        this.canvas.width = MainWindow.PAGE_WIDTH;
        this.canvas.height = MainWindow.PAGE_HEIGHT;
        this.canvas.style.backgroundColor = '#FAFAFA';
        this.context = this.canvas
            .getContext('2d');
        this.tools[MainWindow.LINE_TOOL] = new LineCreationTool();
        this.tools[MainWindow.RECT_TOOL] = new RectCreationTool();
        this.tools[MainWindow.ELLI_TOOL] = new ElliCreationTool();
        this.tools[MainWindow.ROMBUS_TOOL] = new RombusCreationTool();
        this.tools[MainWindow.TRIANGLE_TOOL] = new TriangleCreationTool();
        this.tools[MainWindow.TEXT_TOOL] = new TextCreationTool();
        this.tools[MainWindow.SELE_TOOL] = new SelectionTool();
        this.activeTool = this.tools[MainWindow.LINE_TOOL];
        window.addEventListener('mousedown', this.onMouseDown
            .bind(this));
        window.addEventListener('mouseup', this.onMouseUp
            .bind(this));
    }
    // State Pattern
    setActiveTool(toolIndex) {
        this.activeTool = this.tools[toolIndex];
    }
    onMouseDown(event) {
        if (this.activeTool) {
            this.activeTool
                .onMouseDown(event);
        }
    }
    onMouseUp(event) {
        if (this.activeTool) {
            this.activeTool
                .onMouseUp(event);
        }
    }
    repaint() {
        this.drawGrid(this.context);
        App.getInstance()
            .paint(this.context);
    }
    // private methods ------------------------------------------------------
    drawGrid(context) {
        if (context) {
            context.lineWidth = 1;
            context.strokeStyle = MainWindow.GRID_COLOR;
            const numVerticals = this.canvas.width / MainWindow.GRID_SIZE;
            const numHorizontals = this.canvas.height / MainWindow.GRID_SIZE;
            for (let v = 1; v < numVerticals; v++) {
                context.beginPath();
                context.moveTo(v * MainWindow.GRID_SIZE, 0);
                context.lineTo(v * MainWindow.GRID_SIZE, MainWindow.PAGE_HEIGHT);
                context.stroke();
            }
            for (let h = 1; h < numHorizontals; h++) {
                context.beginPath();
                context.moveTo(0, h * MainWindow.GRID_SIZE);
                context.lineTo(MainWindow.PAGE_WIDTH, h * MainWindow.GRID_SIZE);
                context.stroke();
            }
        }
    }
}
MainWindow.PAGE_WIDTH = 2000;
MainWindow.PAGE_HEIGHT = 2000;
MainWindow.GRID_SIZE = 100;
MainWindow.GRID_COLOR = '#DDD0DD';
MainWindow.LINE_TOOL = 0;
MainWindow.RECT_TOOL = 1;
MainWindow.ELLI_TOOL = 2;
MainWindow.TEXT_TOOL = 3;
MainWindow.SELE_TOOL = 4;
MainWindow.ROMBUS_TOOL = 5;
MainWindow.TRIANGLE_TOOL = 6;
