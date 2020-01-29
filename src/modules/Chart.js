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
        this.buildMethod = undefined;
        this.target = document.querySelector('#test_target');
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

    build() {
        try {
            this.createCanvas();
            this.buildMethod();
        } catch ( err ) {
            console.error( 'Build failed: ', err );
        }
    }

    refreshChart() {
        const currentCanvas = document.getElementById(this.name);
        const ctx = currentCanvas.getContext('2d');
        //  Clear canvas
        ctx.clearRect( 0, 0, currentCanvas.width, currentCanvas.height );
        //  Rebuild
        this.buildMethod();

        //  Logging the refreshed target dimensions
        //  console.log( 'Target width: ', this.target.offsetWidth);        
        //  console.log( 'Target height: ', this.target.offsetHeight);    
    }

    monitorResize(){
        window.addEventListener('resize', ()=>this.refreshChart());
    }

    //  Getters
    get spawn() {
        this.build();
        this.monitorResize();
    }
}

//  Find out where to add a 'refresh/redraw' function,
//  which triggers when 'target' resizes
//  Event listener ->
//      -> Should be added to target
//      -> on target resize -> canvas.height & canvas.width should be 'refreshed'
//                          -> this.buildMethod() should be called again

