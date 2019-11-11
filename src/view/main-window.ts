import { App } from '../controller/app';
import { Tool } from './tool';
import { LineCreationTool } from './line-creation-tool';
import { RectCreationTool } from './rect-creation-tool';
import { SelectionTool } from './selection-tool';
import { RombusCreationTool } from './rombus-creation-tool';
import { ElliCreationTool } from './elli-creation-tool';
import { TriangleCreationTool } from './triangle-creation-tool';
import { TextCreationTool } from './text-creation-tool';

export class MainWindow {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;

    static readonly PAGE_WIDTH: number = 2000;
    static readonly PAGE_HEIGHT: number = 2000;

    static readonly GRID_SIZE: number = 100;
    static readonly GRID_COLOR: string = '#DDD0DD';
    
    static readonly LINE_TOOL: number = 0;
    static readonly RECT_TOOL: number = 1;
    static readonly ELLI_TOOL: number = 2;
    static readonly TEXT_TOOL: number = 3;
    static readonly SELE_TOOL: number = 4;
    static readonly ROMBUS_TOOL: number = 5;
    static readonly TRIANGLE_TOOL: number =6;

    private tools: Tool[] = [];
    private activeTool: Tool | null = null;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById(
            'my-canvas'
        );

        this.canvas.width = MainWindow.PAGE_WIDTH;
        this.canvas.height = MainWindow.PAGE_HEIGHT;
        this.canvas.style.backgroundColor = '#FAFAFA';

        this.context = this.canvas
            .getContext(
                '2d'
            );

            this.tools[ MainWindow.LINE_TOOL ] = new LineCreationTool();
            this.tools[ MainWindow.RECT_TOOL ] = new RectCreationTool();            
            this.tools[ MainWindow.ELLI_TOOL ] = new ElliCreationTool();
            this.tools[ MainWindow.ROMBUS_TOOL] = new RombusCreationTool();
            this.tools[ MainWindow.TRIANGLE_TOOL ] = new TriangleCreationTool();
            this.tools[ MainWindow.TEXT_TOOL ] = new TextCreationTool();
            this.tools[ MainWindow.SELE_TOOL ] = new SelectionTool();

        this.activeTool = this.tools[
            MainWindow.LINE_TOOL
        ];
    
        window.addEventListener(
            'mousedown',
            this.onMouseDown
                .bind(
                    this   
                )
        );

        window.addEventListener(
            'mouseup',
            this.onMouseUp
                .bind(
                    this   
                )
        );
    }

    // State Pattern
    setActiveTool(
        toolIndex: number ): void {

        this.activeTool = this.tools[
            toolIndex
        ];
    }

    onMouseDown(
        event: MouseEvent ): void {
    
        if ( this.activeTool ) {
            this.activeTool
                .onMouseDown(
                    event
                );
        }
    }

    onMouseUp(
        event: MouseEvent ): void {
    
        if ( this.activeTool ) {
            this.activeTool
                .onMouseUp(
                    event
                );
        }
    }

    repaint(): void {
        this.drawGrid(
            this.context
        );

        App.getInstance()
            .paint(
                this.context
            );
    }

    // private methods ------------------------------------------------------

    private drawGrid(
        context: CanvasRenderingContext2D | null ): void {
            
            if ( context ) {
    
            context.lineWidth = 1;
            context.strokeStyle = MainWindow.GRID_COLOR;

            const numVerticals: number = this.canvas.width / MainWindow.GRID_SIZE;
            const numHorizontals: number = this.canvas.height / MainWindow.GRID_SIZE;

            for ( let v: number = 1; v < numVerticals; v++ ) {
                context.beginPath();
                context.moveTo( 
                    v * MainWindow.GRID_SIZE, 0 
                );
                context.lineTo(
                    v * MainWindow.GRID_SIZE, MainWindow.PAGE_HEIGHT 
                );
                context.stroke();
            }

            for ( let h: number = 1; h < numHorizontals; h++ ) {
                context.beginPath();
                context.moveTo( 
                    0, h * MainWindow.GRID_SIZE 
                );
                context.lineTo(
                    MainWindow.PAGE_WIDTH, h * MainWindow.GRID_SIZE 
                );
                context.stroke();
            }
        }
    }
}