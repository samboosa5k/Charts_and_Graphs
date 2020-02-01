/* 
    Parent class:
    Variables ->
    - Name
    - Type (Called back from extended child class)
    - (Other standard variables and labels)
    Functions ->
    - Spawn (attach to document or wherever)
*/

export default class Chart {
    constructor( {name, input, target} ) {
        this.name = name;
        this.style = input.style;
        this.data = input.data;
        this.target = document.querySelector('#test_target');
        this.newCanvas = document.createElement( 'canvas' );
        this.canvas = undefined;
        this.ctx = undefined;
        this.buildChartMethod = undefined;
        this.CC = {width: 0, height: 0};    // Chart container
    }

    //  Methods - Canvas
    _clearCanvas() {
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
    }

    _setSizeCanvas(target){
        const pad = this.style.padding*2;
        const W = this.target.offsetWidth;
        const H = this.target.offsetHeight;
        target.width = W;
        target.height = H;

        this.CC = {width: W-pad, height: H-pad};
    }

    _bindCanvas(target){
        this.target.appendChild( target );
        this.canvas = document.getElementById( this.name );
        this.ctx = this.canvas.getContext( '2d' );
    }

    _createCanvas(shouldRefresh = false, options) {
        const refresh = (shouldRefresh === true) ? true : false;
        const canvasTarget = (refresh) ? this.canvas : this.newCanvas;

        if(refresh){
            this._setSizeCanvas(canvasTarget);
        } else {
            this._setSizeCanvas(canvasTarget);

            // Set New Canvas properties
            canvasTarget.style.position = 'relative';
            canvasTarget.style.zIndex = 999;
            canvasTarget.id = this.name;
            
            // Append to target container
            this._bindCanvas(canvasTarget);            
        }
    }

    //  Methods - Draw chart Interface
    _drawOutline(){
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(0,0, this.canvas.width, this.canvas.height);
    }

    _drawTitle(){
        const fontSize = 12;
        const center = this.canvas.width / 2 - ( this.ctx.measureText( this.name ).width / 2 );
        const xPos = center;
        const yPos = fontSize;
        this.ctx.font = `12px Arial`;
        this.ctx.fillStyle = 'black'
        this.ctx.fillText( `${this.name}`, xPos, yPos );
    }

    _drawInterface(){
        this._drawOutline();
        this._drawTitle();
    }

    //  Methods - Build & Refresh & Monitor-Resize
    _buildChart(shouldRefresh, options) {
        this._createCanvas(options);
        this._drawInterface();
        this.buildChartMethod();
    }

    _refreshChart() {
        const shouldRefresh = true;
        this._clearCanvas();
        this._buildChart(shouldRefresh);   
    }

    _monitorResize(){
        window.addEventListener('resize', ()=>this._refreshChart());
    }

    //  Method - FIRST BUILD
    get spawn() {
        this._buildChart();
        this._monitorResize();
    }
}