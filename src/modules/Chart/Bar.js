import Chart from '../Chart.js';
import {colors} from '../../colors.js';


/* 
    Child class: 'Bar'
*/

export default class Bar extends Chart {
    constructor( name, input, targetId ) {
        super( name, input );
        this.chartType = 'bar_chart';
        this.targetId = targetId;
        this.buildMethod = this.init;
        this.input = input;
        this.sortedInput = undefined;
    }

    //  Method - sort
    sortBy( method ) {
        switch ( method ) {
            case 'count':
                console.log( 'sorted' );
                this.sortedInput = this.input.sort( ( a, b ) => {
                    if ( a.count < b.count ) return -1;
                    if ( a.count > b.count ) return 1;
                } );
                break;
        }
    }

    //  Method - build
    barGen( inputObject = this.input ) {
        /* Canvas */
        const canvas = document.getElementById( this.name );
        const ctx = canvas.getContext( '2d' );
        /* Input data */
        const keyArray = this.sortedInput.map( obj => { return obj.key } );
        const valArray = this.sortedInput.map( obj => { return obj.count } );
        const valSum = valArray.reduce( ( a, b ) => {
            return a + b;
        } );
        const maxVal = Math.max.apply( Math, valArray );

        /* Bar scaling/position */
        const barW = Math.round( canvas.width / keyArray.length );
        const maxH = canvas.height;

        /* The loop */
        for ( let key of keyArray ) {
            let xOffset = ( keyArray.indexOf( key ) ) * barW;
            let barH = ( valArray[keyArray.indexOf( key )] / maxVal ) * maxH;
            let yOffset = canvas.height - barH;
            let barColor = colors[Math.round( Math.random() * colors.length )];
            let center = xOffset + ( barW / 2 ) - ( ctx.measureText( key ).width / 2 );

            //  bars
            ctx.fillStyle = barColor;
            ctx.fillRect( xOffset, yOffset, barW, barH );
            //  labels
            ctx.font = `${barW / 5}px Arial`;
            ctx.fillStyle = 'black'
            ctx.fillText( `${key}`, center, yOffset );

        }
    }

    init() {
        this.sortBy( 'count' );
        this.barGen();
        console.log(this.input, this.sortedInput);
    }
}
