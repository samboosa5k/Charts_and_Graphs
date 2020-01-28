import Chart from '../Chart.js';
import {colors} from '../../colors.js';


/* 
    Child class: 'Bar'
*/

export default class Test extends Chart {
    constructor( name, targetId ) {
        super( name );
        this.chartType = 'test_chart';
        this.targetId = targetId;
        this.buildMethod = this.init;
        this.sortedInput = undefined;
    }

    //  Method - build
    testGen( inputObject = this.input ) {
        /* Canvas */
        const canvas = document.getElementById( this.name );
        const ctx = canvas.getContext( '2d' );

        /* Bar scaling/position */
        const barW = 100;
        const barH = 100;
        const xOffset = Math.round(canvas.width/2);
        const yOffset = Math.round(canvas.height/2);

        let barColor = 'black';

        //  test shape
        ctx.fillStyle = barColor;
        ctx.fillRect( 100,100,100,100 );

        console.log( `${xOffset}    ${yOffset}    ${barW}     ${barH}`);
    }

    init() {
        this.testGen();
    }
}
