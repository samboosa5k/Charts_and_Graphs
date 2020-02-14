/* Functional/important imports */
import { SiblingContextController as SCC} from './Registry.js';

/* 
    Parent class:
    Variables ->
    - Name
    - Type (Called back from extended child class)
    - (Other standard variables and labels)
    Functions ->
    - Spawn (attach canvas to target)
*/

export const SIBCONTEXT = {
    name: undefined,
    type: 'BarType',
    identifier: undefined,
    style: undefined,
    // Canvas
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
    coords: []
}

export default class Chart {
    constructor( {name, identifier, attach_target, style} ) {
        // From input -> CONTEXT
        SIBCONTEXT.name = name;
        SIBCONTEXT.identifier = identifier;
        SIBCONTEXT.style = style;
        this.sibExists = SCC.retrieve( SIBCONTEXT.identifier ) !== undefined;
        this.target = document.querySelector(attach_target);
        // Dynamic build method
        this.buildChartMethod = undefined;
    }

    //  Methods - Canvas
    _clearCanvas() {
        SIBCONTEXT.ctx.clearRect( 0, 0, SIBCONTEXT.canvas.width, SIBCONTEXT.canvas.height );
    }

    _setSizeCanvas(target){
        const pad = SIBCONTEXT.style.padding*2;
        const W = this.target.offsetWidth;
        const H = this.target.offsetHeight;
        target.width = W;
        target.height = H;
        
        SIBCONTEXT.CC = {width: W-pad, height: H-pad};
    }

    _bindCanvas(target){
        this.target.appendChild( target );
        SIBCONTEXT.canvas = document.getElementById( SIBCONTEXT.identifier );
        SIBCONTEXT.ctx = SIBCONTEXT.canvas.getContext( '2d' );
    }

    _createCanvas(shouldRefresh, options) {
        const canvasTarget = ( shouldRefresh === true ) ?
            SIBCONTEXT.canvas :
            document.createElement( 'canvas' );

        if(shouldRefresh){
            this._setSizeCanvas(canvasTarget);
        } else {
            this._setSizeCanvas(canvasTarget);

            // Set New Canvas properties
            canvasTarget.style.position = 'relative';
            canvasTarget.style.zIndex = 999;
            canvasTarget.id = SIBCONTEXT.identifier;
            
            // Append to target container
            this._bindCanvas(canvasTarget);            
        }
    }

    //  Methods - Draw chart Interface
    _drawOutline(){
        SIBCONTEXT.ctx.strokeStyle = 'black';
        SIBCONTEXT.ctx.strokeRect(0,0, SIBCONTEXT.canvas.width, SIBCONTEXT.canvas.height);
    }

    _drawTitle(){
        const fontSize = 12;
        const center = SIBCONTEXT.canvas.width / 2 - ( SIBCONTEXT.ctx.measureText( SIBCONTEXT.name ).width / 2 );
        const xPos = center;
        const yPos = fontSize;
        SIBCONTEXT.ctx.font = `12px Arial`;
        SIBCONTEXT.ctx.fillStyle = 'black'
        SIBCONTEXT.ctx.fillText( `${SIBCONTEXT.name}`, xPos, yPos );
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
        const sibling = SCC.retrieve(SIBCONTEXT.identifier);
        SIBCONTEXT.canvas = document.getElementById(SIBCONTEXT.identifier);
        SIBCONTEXT.ctx = SIBCONTEXT.canvas.getContext( '2d' );
        SIBCONTEXT.CC = sibling.CC;
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