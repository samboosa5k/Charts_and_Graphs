/* Functional/important imports */
import { SiblingOutputController as SOC} from './Registry.js';

/* 
    Parent class:
    Variables ->
    - Name
    - Type (Called back from extended child class)
    - (Other standard variables and labels)
    Functions ->
    - Spawn (attach canvas to target)
*/

export const SIBOUTPUT = {
    name: undefined,
    type: 'BarType',
    identifier: undefined,
    canvas: undefined,
    ctx: undefined,
    CC: undefined,
    grid: {
        nrLinesMax: undefined,
        yLabelMax: undefined
    },
    labels: {
        axis: [],
        grid: [],
        bar: [],
        group: []
    },
    bars: [],
    coords: []
}

export default class Chart {
    constructor( {name, identifier, attach_target, style} ) {
        // From input
        this.identifier = identifier;
        SIBOUTPUT.name = name;
        SIBOUTPUT.identifier = identifier;
        this.sibExists = SOC.retrieve( SIBOUTPUT.identifier ) !== undefined;
        this.target = document.querySelector(attach_target);
        this.style = style;
        // Dynamic build method
        this.buildChartMethod = undefined;
    }

    //  Methods - Canvas
    _clearCanvas() {
        SIBOUTPUT.ctx.clearRect( 0, 0, SIBOUTPUT.canvas.width, SIBOUTPUT.canvas.height );
    }

    _setSizeCanvas(target){
        const pad = this.style.padding*2;
        const W = this.target.offsetWidth;
        const H = this.target.offsetHeight;
        target.width = W;
        target.height = H;

        SIBOUTPUT.CC = {width: W-pad, height: H-pad};
    }

    _bindCanvas(target){
        this.target.appendChild( target );
        SIBOUTPUT.canvas = document.getElementById( SIBOUTPUT.identifier );
        SIBOUTPUT.ctx = SIBOUTPUT.canvas.getContext( '2d' );
    }

    _createCanvas(shouldRefresh, options) {
        const canvasTarget = ( shouldRefresh === true ) ?
            SIBOUTPUT.canvas :
            document.createElement( 'canvas' );

        if(shouldRefresh){
            this._setSizeCanvas(canvasTarget);
        } else {
            this._setSizeCanvas(canvasTarget);

            // Set New Canvas properties
            canvasTarget.style.position = 'relative';
            canvasTarget.style.zIndex = 999;
            canvasTarget.id = SIBOUTPUT.identifier;
            
            // Append to target container
            this._bindCanvas(canvasTarget);            
        }
    }

    //  Methods - Draw chart Interface
    _drawOutline(){
        SIBOUTPUT.ctx.strokeStyle = 'black';
        SIBOUTPUT.ctx.strokeRect(0,0, SIBOUTPUT.canvas.width, SIBOUTPUT.canvas.height);
    }

    _drawTitle(){
        const fontSize = 12;
        const center = SIBOUTPUT.canvas.width / 2 - ( SIBOUTPUT.ctx.measureText( SIBOUTPUT.name ).width / 2 );
        const xPos = center;
        const yPos = fontSize;
        SIBOUTPUT.ctx.font = `12px Arial`;
        SIBOUTPUT.ctx.fillStyle = 'black'
        SIBOUTPUT.ctx.fillText( `${SIBOUTPUT.name}`, xPos, yPos );
    }

    _drawInterface(){
        this._drawOutline();
        this._drawTitle();
    }

    //  Methods - Build & Refresh & Monitor-Resize
    _buildChart(shouldRefresh, options) {
        this._createCanvas(shouldRefresh, options);
        this._drawInterface();
    }

    _refreshChart(shouldRefresh = true, options) {
        this._clearCanvas();
        this._buildChart(shouldRefresh, options);   
        this.buildChartMethod();
    }

    _monitorResize(){
        window.addEventListener('resize', ()=>this._refreshChart());
    }

    //  Method - IF SIBLING EXISTS
    _initSiblingProperties(){
        const sibling = SOC.retrieve(SIBOUTPUT.identifier);
        SIBOUTPUT.canvas = document.getElementById(SIBOUTPUT.identifier);
        SIBOUTPUT.ctx = SIBOUTPUT.canvas.getContext( '2d' );
        SIBOUTPUT.CC = sibling.CC;
    }

    //  Method - FIRST BUILD
    get spawn() {
        if(this.sibExists){
            this._initSiblingProperties();
            this.buildChartMethod();
        } else {
            this._buildChart();
            this.buildChartMethod();
            this._monitorResize();
        }
    }
}