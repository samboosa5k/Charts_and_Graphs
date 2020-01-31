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
        this.input = input;
        this.chartType = undefined;
        this.buildChartMethod = undefined;
        this.target = document.querySelector('#test_target');
        this.newCanvas = document.createElement( 'canvas' );
        this.canvas = undefined;
        this.ctx = undefined;
    }

    //  Methods - Canvas
    _clearCanvas() {
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
    }

    _createCanvas(option) {
        const refresh = (option === 'refresh') ? true : false;
        const canvasTarget = (refresh) ? this.canvas : this.newCanvas;

        if(refresh){
            canvasTarget.width = this.target.offsetWidth;
            canvasTarget.height = this.target.offsetHeight;
        } else {
            // Set New Canvas properties
            canvasTarget.id = this.name;
            canvasTarget.width = this.target.offsetWidth;
            canvasTarget.height = this.target.offsetHeight;
            canvasTarget.style.zIndex = 999;
            canvasTarget.style.position = 'relative';
            // Append to target container
            this.target.appendChild( canvasTarget );
            // Instantiate canvas to child chart
            this.canvas = document.getElementById( this.name );
            this.ctx = this.canvas.getContext( '2d' );
        }
    }

    //  Methods - Draw chart Interface
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
        this._drawTitle();
    }

    //  Methods - Build & Refresh & Monitor-Resize
    _buildChart(option) {
        this._createCanvas(option);
        this._drawInterface();
        this.buildChartMethod();
    }

    _refreshChart() {
        this._clearCanvas();
        this._buildChart('refresh');   
    }

    _monitorResize(){
        window.addEventListener('resize', ()=>this._refreshChart());
    }

    //  Method - FINAL BUILD
    get spawn() {
        this._buildChart();
        this._monitorResize();
    }
}