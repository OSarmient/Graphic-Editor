var bundle = (function (exports) {
    'use strict';

    class Figure {
        constructor(position, size, color) {
            this.position = position;
            this.size = size;
            this.color = color;
            this.selected = false;
        }
        setColor(context, color) {
            context.strokeStyle = color;
        }
        // template method
        paint(context) {
            // 1. compose color
            const color = 'rgba('
                + this.color.r
                + ','
                + this.color.g
                + ','
                + this.color.b
                + ','
                + this.color.a
                + ')';
            // 2. set color
            this.setColor(context, color);
            // 3. call abstract paint
            this.doPaint(context);
            // 4. if selected => draw bbox
            if (this.selected) ;
        }
    }

    class GeometricFigure extends Figure {
        constructor(position, size, color, lineWidth, lineStyle) {
            super(position, size, color);
            this.lineWidth = lineWidth;
            this.lineStyle = lineStyle;
        }
    }

    class Line extends GeometricFigure {
        constructor(position, size, color = { r: 255, g: 0, b: 0, a: 1 }, lineWidth = 10, lineStyle = 'solid') {
            super(position, size, color, lineWidth, lineStyle);
        }
        doPaint(context) {
            context.lineWidth = this.lineWidth;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(this.position.x, this.position.y);
            context.lineTo(this.position.x + this.size.w, this.position.y + this.size.h);
            context.stroke();
        }
    }

    class Text extends Figure {
        constructor(position, size, color, fontName, fontSize, fontStyle, text) {
            super(position, size, color);
            this.fontName = fontName;
            this.fontSize = fontSize;
            this.fontStyle = fontStyle;
            this.text = text;
        }
        // @Override
        setColor(context, color) {
            context.fillStyle = color;
        }
        doPaint(context) {
            context.beginPath();
            context.rect(this.position.x, this.position.y - this.size.h, this.size.w, this.size.h);
            //      context.clip();
            context.font = `${this.fontStyle} ${this.fontSize}px ${this.fontName}`;
            context.fillText(this.text, this.position.x, this.position.y);
        }
    }

    class Drawing {
        constructor() {
            this.figures = [];
            this.modified = false;
            this.name = null;
            // this.test();
        }
        addFigure(f) {
            this.figures
                .push(f);
            this.modified = true;
        }
        paint(context) {
            // iterator 
            this.figures
                .forEach((f) => f.paint(context));
        }
        // private methods ------------------------------------------------------
        test() {
            this.figures
                .push(new Line({
                x: 100,
                y: 100
            }, {
                w: 600,
                h: 0
            }, {
                r: 160,
                g: 0,
                b: 255,
                a: 1.0
            }, 10, 'solid'));
            this.figures
                .push(new Line({
                x: 700,
                y: 100
            }, {
                w: 0,
                h: 500
            }, {
                r: 0,
                g: 0,
                b: 255,
                a: 0.5
            }, 20, 'solid'));
            this.figures
                .push(new Line({
                x: 700,
                y: 600
            }, {
                w: -600,
                h: 0
            }, {
                r: 0,
                g: 0,
                b: 255,
                a: 1.0
            }, 30, 'solid'));
            this.figures
                .push(new Line({
                x: 100,
                y: 600
            }, {
                w: 0,
                h: -500
            }, {
                r: 0,
                g: 255,
                b: 0,
                a: 0.5
            }, 40, 'solid'));
            this.figures
                .push(new Text({
                x: 300,
                y: 300
            }, {
                w: 200,
                h: 100
            }, {
                r: 0,
                g: 0,
                b: 255,
                a: 1.0
            }, 'Arial', 32, 'bold', 'ABCabc123'));
        }
        selectPoint(pt) {
            // 1. iterate backwards
            // 2. etc.
        }
    }

    class Tool {
        constructor() {
            this.ptPressed = null;
            this.ptReleased = null;
        }
        onMouseDown(event) {
            this.ptPressed = event;
        }
        // Template Method
        onMouseUp(event) {
            // 1. store event
            this.ptReleased = event;
            // 2. do something w/the points
            this.handleMouseReleased();
        }
    }

    class CreationTool extends Tool {
        // Template Method
        handleMouseReleased() {
            // 1. check if equal
            const equals = !!this.ptPressed
                && !!this.ptReleased
                && this.ptPressed.clientX
                    === this.ptReleased.clientX
                && this.ptPressed.clientY
                    === this.ptReleased.clientY;
            if (equals) ;
            else {
                // figure creation
                // 1. create bbox
                // 2. maybe normalize bbox
                // 3. create object
                const f = this.createFigure(this.ptPressed, this.ptReleased);
                // 4. check figure
                if (!!f) {
                    // 5. => App
                    App.getInstance()
                        .addFigure(f);
                }
            }
        }
        ;
    }

    class LineCreationTool extends CreationTool {
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

    class Rectangle extends GeometricFigure {
        constructor(position, size, color = { r: 255, g: 0, b: 0, a: 1 }, lineWidth = 10, lineStyle = 'solid') {
            super(position, size, color, lineWidth, lineStyle);
        }
        doPaint(context) {
            context.lineWidth = this.lineWidth;
            context.beginPath();
            context.rect(this.position.x, this.position.y, this.size.w, this.size.h);
            context.stroke();
        }
    }

    class RectCreationTool extends CreationTool {
        createFigure(ptPressed, ptReleased) {
            if (!!ptPressed && !!ptReleased) {
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

    class SelectionTool extends Tool {
        handleMouseReleased() {
            const equals = !!this.ptPressed
                && !!this.ptReleased
                && this.ptPressed.offsetX === this.ptReleased.offsetX
                && this.ptPressed.offsetY === this.ptReleased.offsetY;
            if (equals) {
                // point selection
                App.getInstance()
                    .selectPoint(this.ptReleased);
            }
        }
        ;
    }

    class Rombus extends GeometricFigure {
        constructor(position, size, color = { r: 56, g: 255, b: 0, a: 1 }, lineWidth = 10, lineStyle = 'solid') {
            super(position, size, color, lineWidth, lineStyle);
        }
        doPaint(context) {
            context.lineWidth = this.lineWidth;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(this.position.x + (this.size.w / 2), this.position.y);
            context.lineTo(this.position.x + this.size.w, this.position.y + (this.size.h / 2));
            context.moveTo(this.position.x + (this.size.w / 2), this.position.y + this.size.h);
            context.lineTo(this.position.x + this.size.w, this.position.y + (this.size.h / 2));
            context.moveTo(this.position.x, this.position.y + this.size.h / 2);
            context.lineTo(this.position.x + this.size.w / 2, this.position.y + this.size.h);
            context.moveTo(this.position.x, this.position.y + this.size.h / 2);
            context.lineTo(this.position.x + this.size.w / 2, this.position.y + this.size.h / (this.size.h * 2));
            context.stroke();
        }
    }

    class RombusCreationTool extends CreationTool {
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

    class Ellipse extends GeometricFigure {
        constructor(position, size, color = { r: 255, g: 0, b: 0, a: 1 }, lineWidth = 10, lineStyle = 'solid', rotation = 0, startAngle = 0, endAngle = 360) {
            super(position, size, color, lineWidth, lineStyle);
            this.rotation = rotation;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
        }
        doPaint(context) {
            context.lineWidth = this.lineWidth;
            context.beginPath();
            context.ellipse(this.position.x, this.position.y, this.size.w, this.size.h, this.rotation, this.startAngle, this.endAngle);
            context.stroke();
        }
    }

    class ElliCreationTool extends CreationTool {
        createFigure(ptPressed, ptReleased) {
            if (!!ptPressed && !!ptReleased) {
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

    class Triangle extends GeometricFigure {
        constructor(position, size, color = { r: 255, g: 0, b: 0, a: 1 }, lineWidth = 10, lineStyle = 'solid') {
            super(position, size, color, lineWidth, lineStyle);
        }
        doPaint(context) {
            context.lineWidth = this.lineWidth;
            context.lineCap = 'round';
            context.strokeStyle = 'green';
            context.beginPath();
            context.moveTo(this.position.x, this.position.y + this.size.h);
            context.lineTo(this.position.x + this.size.w, this.position.y + this.size.h);
            context.moveTo(this.position.x + this.size.w / 2, this.position.y);
            context.lineTo(this.position.x + this.size.w, this.position.y + this.size.h);
            context.moveTo(this.position.x, this.position.y + this.size.h);
            context.lineTo(this.position.x + this.size.w / 2, this.position.y + this.size.h / (this.size.h * 2));
            context.stroke();
        }
    }

    class TriangleCreationTool extends CreationTool {
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

    class TextCreationTool extends CreationTool {
        createFigure(ptPressed, ptReleased) {
            if (!!ptPressed && !!ptReleased) {
                return new Text({
                    x: ptPressed.offsetX,
                    y: ptPressed.offsetY,
                }, {
                    w: ptReleased.offsetX - ptPressed.offsetX,
                    h: ptReleased.offsetY - ptPressed.offsetY,
                }, {
                    r: 0,
                    g: 0,
                    b: 255,
                    a: 1.0
                }, 'Arial', 32, 'bold', 'HolaMundo');
            }
            return null;
        }
    }

    class MainWindow {
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

    class App {
        constructor() {
            this.drawing = new Drawing();
            this.mainWindow = new MainWindow();
        }
        static getInstance() {
            if (App.instance) ;
            else {
                App.instance = new App();
            }
            return App.instance;
        }
        run() {
            this.repaint();
        }
        repaint() {
            this.mainWindow
                .repaint();
        }
        addFigure(f) {
            this.drawing
                .addFigure(f);
            this.repaint();
        }
        paint(context) {
            if (context) {
                this.drawing
                    .paint(context);
            }
            else {
                console.error('NULL 2D CONTEXT');
            }
        }
        selectPoint(pt) {
            this.drawing
                .selectPoint(pt);
        }
        setActiveTool(tidx) {
            this.mainWindow
                .setActiveTool(tidx);
        }
        setLineCreation() {
            this.setActiveTool(MainWindow.LINE_TOOL);
        }
        setRectCreation() {
            this.setActiveTool(MainWindow.RECT_TOOL);
        }
        setRombusCreation() {
            this.setActiveTool(MainWindow.ROMBUS_TOOL);
        }
        setEllipseCreation() {
            this.setActiveTool(MainWindow.ELLI_TOOL);
        }
        setTriangleCreation() {
            this.setActiveTool(MainWindow.TRIANGLE_TOOL);
        }
        setTextCreation() {
            this.setActiveTool(MainWindow.TEXT_TOOL);
        }
    }

    const app = App.getInstance();
    app.run();

    exports.app = app;

    return exports;

}({}));
