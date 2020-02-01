import Chart from '../Chart.js';


/* 
    Child class: 'Bar'
*/

export default class Bar extends Chart {
    constructor( {name, input} ) {
        super( {name, input} );
        this.buildChartMethod = this.init;
        // this.sortedInput = undefined;
        this.keyArray = this.data.map( obj => { return obj.key } );
        this.valArray = this.data.map( obj => { return obj.count } );
        this.maxVal = Math.max.apply( Math, this.valArray );
        this.yLabelInc = 20;
        this.yLabelMax = undefined;
        this.nrLinesMax = undefined;
    }


    //  Method - sort
    /* sortBy( method ) {
        switch ( method ) {
            case 'count':
                // console.log( 'sorted' );
                this.sortedInput = this.data.sort( ( a, b ) => {
                    if ( a.count < b.count ) return -1;
                    if ( a.count > b.count ) return 1;
                } );
                break;
        }
    } */
    calcGrid(){
        const gridMax = ( () => {
            let nrLinesMax = 0;
            let yLabelMax = 0
            while ( yLabelMax <= this.maxVal ) {
                nrLinesMax += 1;
                yLabelMax += this.yLabelInc;
            }
            return {
                nrLinesMax,
                yLabelMax
            }
        } )();
        this.nrLinesMax = gridMax.nrLinesMax;
        this.yLabelMax = gridMax.yLabelMax;
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

    drawGrid(w,h){
        const origin = this.style.padding;
        
        // Background
        this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
        this.ctx.fillRect( origin, origin, w, h );
        // this.ctx.strokeRect( x, y, w, h );

        // Lines & labels
        for(let i=0; i<=this.nrLinesMax; i++){
            let yPos = origin + ( this.CC.height / this.nrLinesMax ) * i;
            let xPos = origin;
            let yLabel = this.yLabelMax-(this.yLabelInc*i);

            this.ctx.beginPath();
            this.ctx.moveTo( xPos, xPos + ( this.CC.height / this.nrLinesMax)*i);
            this.ctx.lineTo( xPos + this.CC.width, yPos);
            this.ctx.stroke();
            this.drawLabel( xPos-24, yPos, yLabel );
        }
    }

    //  Method - generate BARS
    barGen( inputData = this.data ) {
        const maxW = Math.floor( this.CC.width / inputData.length );
        const scaleY = this.maxVal/this.yLabelMax;
        const maxH = this.CC.height * scaleY;

        /* The loop */
           for(let i=0; i<this.keyArray.length; i++){
            let barColor = 'Lavender';
            let barW = maxW/2;
            let barH = (this.valArray[i]/this.maxVal)*maxH;

            let xOffset = (this.style.padding) + (i * maxW);
            let yOffset = this.CC.height + (this.style.padding) - barH;

            let centerBar = xOffset - (barW / 2) + (maxW / 2);
            let centerLabel = xOffset - ( this.ctx.measureText( this.keyArray[i] ).width / 2 ) + ( maxW / 2 );

            //  bars
            this.drawBar(centerBar, yOffset, barW, barH, barColor);

            //  labels
            this.drawLabel( centerLabel, this.CC.height + ( this.style.padding ) + 24, this.keyArray[i]);
        }
    }

    //  Method - generate GRID
    layoutGen() {
        this.calcGrid();
        this.drawGrid( this.CC.width, this.CC.height );
    }
    
    init() {
        // this.sortBy( 'count' );
        this.layoutGen();
        this.barGen();
    }
}
