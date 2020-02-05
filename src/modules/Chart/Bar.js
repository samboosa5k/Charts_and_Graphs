import Chart from '../Chart.js';


/* 
    Child class: 'Bar'
*/

export default class Bar extends Chart {
    constructor( { name, attach_target, style, axis_labels, data} ) {
        super( { name, attach_target, style, axis_labels, data} );
        this.buildChartMethod = this.init;
        // this.sortedInput = undefined;
        this.keyArray = this.data.map( obj => { return obj.key } );
        this.valArray = this.data.map( obj => { return obj.value } );
        this.maxVal = Math.max.apply( Math, this.valArray );
        this.yLabelInc = 20;
        this.yLabelMax = undefined;
        this.nrLinesMax = undefined;
    }


    //  Method - sort
    /* sortBy( method ) {
        switch ( method ) {
            case 'value':
                // console.log( 'sorted' );
                this.sortedInput = this.data.sort( ( a, b ) => {
                    if ( a.value < b.value ) return -1;
                    if ( a.value > b.value ) return 1;
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

    drawLabel( x, y, xAlign = undefined, yAlign = undefined, label, rotate = undefined){
        const rotateFactor = 180/rotate;
        if(rotate !== undefined){
            this.ctx.save();
            this.ctx.translate(0,0);
            this.ctx.rotate(Math.PI/rotateFactor);
        }

        this.ctx.font = `12px Arial`;
        this.ctx.fillStyle = 'black'
        
        /* 
            Alignment:
            - start
            - end
            - left
            - center
            - right
        */
        if(xAlign !== undefined){
            this.ctx.textAlign = `${xAlign}`;
            this.ctx.textBaseline = `${yAlign}`;
        }

        this.ctx.fillText( `${label}`, x, y );

        if(rotate !== undefined){
            this.ctx.restore();
        }
    }

    drawAxisLabels(){
        const xAxisLabel = this.axisLabels.x;
        const yAxisLabel = this.axisLabels.y;
        const h = this.canvas.height;
        const w = this.canvas.width;
        const p = this.style.padding/2;

        // yAxisLabel
        this.drawLabel(-h/2, p, 'center', 'middle', yAxisLabel, -90);
        // xAxisLabel
        this.drawLabel(w/2, h-p, 'center', 'middle', xAxisLabel);
    }

    drawGrid(){
        const origin = this.style.padding;
        const w = this.CC.width;
        const h = this.CC.height;
        
        // Background
        this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
        this.ctx.fillRect( origin, origin, w, h );
        // this.ctx.strokeRect( x, y, w, h );

        // Lines & labels
        for(let i=0; i<=this.nrLinesMax; i++){
            let yPos = origin + ( this.CC.height / this.nrLinesMax ) * i;
            let xPos = origin;
            let yLabel = this.yLabelMax-(this.yLabelInc*i);

            // The lines
            this.ctx.beginPath();
            this.ctx.moveTo( xPos, xPos + ( this.CC.height / this.nrLinesMax)*i);
            this.ctx.lineTo( xPos + this.CC.width, yPos);
            this.ctx.stroke();

            // The labels
            this.drawLabel( xPos, yPos, 'end','middle', yLabel);
        }
    }

    //  Method - generate BARS
    barGen( inputData = this.data ) {
        const maxW = Math.floor( this.CC.width / inputData.length );
        const scaleY = this.maxVal/this.yLabelMax;
        const maxH = this.CC.height * scaleY;

        /* The loop */
        for ( let i = 0; i < this.keyArray.length; i++ ) {
            let barColor = this.style.chart_colors[i%this.style.chart_colors.length];
            let yLabel = this.keyArray[i];

            // Dimension calculation
            let barW = maxW / 2;
            let barH = ( this.valArray[i] / this.maxVal ) * maxH;

            // Initial offset
            let xOffset = ( this.style.padding ) + ( i * maxW );
            let yOffset = this.CC.height + ( this.style.padding ) - barH;

            // Final offset
            let xPosBar = xOffset - ( barW / 2 ) + ( maxW / 2 );
            let xPosLabel = xOffset + ( maxW / 2 );
            let yPosLabel = this.CC.height + this.style.padding;

            //  bars
            this.drawBar( xPosBar, yOffset, barW, barH, barColor );

            //  labels
            this.drawLabel( xPosLabel, yPosLabel, 'center', 'hanging', yLabel );
        }
    }

    //  Method - generate GRID
    layoutGen() {
        this.calcGrid();
        this.drawGrid();
        this.drawAxisLabels();
    }
    
    init() {
        // this.sortBy( 'value' );
        this.layoutGen();
        this.barGen();
    }
}
