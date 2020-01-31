import Chart from '../Chart.js';

/* 
    Child class: 'Bar'
*/

export default class Test extends Chart {
    constructor( {name} ) {
        super( {name} );
        this.buildMethod = this.init;
    }

    //  Method - build
    testGen( inputObject = this.input ) {
        /* Canvas */
        const canvas = document.getElementById( this.name );
        const ctx = canvas.getContext( '2d' );

        /* Bar scaling/position */
        const barW = Math.round(this.target.offsetWidth/4);
        const barH = Math.round(this.target.offsetHeight/4);
        const xOffset = Math.round(canvas.width/2);
        const yOffset = Math.round(canvas.height/2);

        let barColor = 'black';

        //  test shape
        ctx.fillStyle = barColor;
        ctx.fillRect( 100, 100, barW, barH );

        console.log( `x: ${xOffset} y: ${yOffset} w: ${barW} h: ${barH}`);
    }

    init() {
        this.testGen();
    }
}

// http://cssdeck.com/labs/emcxdwuz