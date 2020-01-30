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
        this.canvas = undefined;
        this.ctx = undefined;
        this.output = undefined;
    }

    //  Methods
    createCanvas() {
        const canvas = document.createElement( 'canvas' );
        canvas.id = this.name;
        canvas.width = this.target.offsetWidth;
        canvas.height = this.target.offsetHeight;
        canvas.style.zIndex = 999;
        canvas.style.position = 'relative';
        this.target.appendChild( canvas );
    }

    instantiateCanvas(){
        this.canvas = document.getElementById( this.name );
        this.ctx = this.canvas.getContext( '2d' );
    }

    drawTitle(){
        let fontSize = 12;
        let center = this.canvas.width / 2 - ( this.ctx.measureText( this.name ).width / 2 );
        let xPos = center;
        let yPos = fontSize;
        this.ctx.font = `12px Arial`;
        this.ctx.fillStyle = 'black'
        this.ctx.fillText( `${this.name}`, xPos, yPos );
        console.log(yPos);
    }

    buildChart() {
        try {
            this.createCanvas();
            this.instantiateCanvas();
            this.drawTitle();
            this.buildChartMethod();
        } catch ( err ) {
            console.error( 'Build failed: ', err );
        }
    }

    refreshCanvas() {
        //  Clear canvas
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        //  Re-set canvas dimensions
        this.canvas.width = this.target.offsetWidth;
        this.canvas.height = this.target.offsetHeight;
        //  Rebuild chart with specific buildChartMethod()
        this.drawTitle();
        this.buildChartMethod();   
    }

    monitorResize(){
        window.addEventListener('resize', ()=>this.refreshCanvas());
    }

    //  Getters
    get spawn() {
        this.buildChart();
        this.monitorResize();
    }
}

//  Find out where to add a 'refresh/redraw' function,
//  which triggers when 'target' resizes
//  Event listener ->
//      -> Should be added to target
//      -> on target resize -> canvas.height & canvas.width should be 'refreshed'
//                          -> this.buildChartMethod() should be called again

