import Chart from '../Chart.js';


/* 
    Child class: 'Bar'
*/

export default class Bar extends Chart {
    constructor( {name, input} ) {
        super( {name, input} );
        this.buildChartMethod = this.init;
        this.input = input;
        this.sortedInput = undefined;
        this.keyArray = this.input.map( obj => { return obj.key } );
        this.valArray = this.input.map( obj => { return obj.count } );
        this.maxVal = Math.max.apply( Math, this.valArray );
    }


    //  Method - sort
    sortBy( method ) {
        switch ( method ) {
            case 'count':
                // console.log( 'sorted' );
                this.sortedInput = this.input.sort( ( a, b ) => {
                    if ( a.count < b.count ) return -1;
                    if ( a.count > b.count ) return 1;
                } );
                break;
        }
    }

    drawBar(x,y,w,h,color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect( x, y, w, h );
        this.ctx.strokeRect( x, y, w, h );
    }

    drawLabel(x,y,label){
        this.ctx.font = `12px Arial`;
        this.ctx.fillStyle = 'black'
        this.ctx.fillText( `${label}`, x, y );
    }

    //  Method - build
    barGen( inputObject = this.input ) {
        const valSum = this.valArray.reduce( ( a, b ) => {
            return a + b;
        } );

        /* 
            Bar scaling/position:
                - barContainerW = default bar container size based on canvas size
                - barW = set bar width
                - maxH = max bar height as determined by canvas
        */
        const barContainerW = Math.floor( this.target.offsetWidth / inputObject.length );
        const barW = barContainerW/2;
        const maxH = this.canvas.height;

        /* The loop */
        for ( let key of this.keyArray ) {
            let barColor = 'Lavender';
            /* 
                Iterative bar scaling/offset
                    - barH = height of current bar, based on input values & sum
                    - xOffset/yOffset = absolute bar offset based on loop index and barH
                    - centerBar/centerLabel = relative centering based on absolute offset
            */
            let barH = ( this.valArray[this.keyArray.indexOf( key )] / this.maxVal ) * maxH;
            let xOffset = ( this.keyArray.indexOf( key ) ) * barContainerW;
            let yOffset = this.canvas.height - barH;
            let centerBar = xOffset - (barW / 2) + (barContainerW / 2);
            let centerLabel = xOffset - ( this.ctx.measureText( key ).width / 2 ) + ( barContainerW / 2 );

            //  bars
            this.drawBar(centerBar, yOffset, barW, barH, barColor);
            
            //  labels
            this.drawLabel(centerLabel, maxH, key);
        }
    }

    init() {
        // this.sortBy( 'count' );
        this.barGen();
    }
}
