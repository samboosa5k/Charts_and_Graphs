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
    constructor( {name, input} ) {
        this.name = name;
        this.input = input;
        this.chartType = undefined;
        this.buildMethod = undefined;
        //this.target = undefined;
        this.output = undefined;
    }

    //  Methods
    createCanvas() {
        const canvas = document.createElement( 'canvas' );
        canvas.id = this.name;
        canvas.width = 1280;
        canvas.height = 720;
        canvas.style.zIndex = 999;
        canvas.style.position = 'relative';
        //  this.target needs to be provided later
        document.body.appendChild( canvas );
    }

    build() {
        try {
            this.createCanvas();
            this.buildMethod();
        } catch ( err ) {
            console.error( 'Build failed: ', err );
        }
    }

    collectInfo() {
        return {
            name: this.name,
            chart_type: this.chartType,
            input_type: this.inputType,
            input: this.input,
            targe: this.target
        }
    }

    //  Getters
    get about() {
        return this.collectInfo();
    }

    get spawn() {
        this.build();
    }
}


