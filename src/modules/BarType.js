/* Functional/important imports */
import { SiblingOutputController as SOC} from './Registry.js';
/* Chart parent import */
import Chart,{SIBOUTPUT} from './Chart.js';

export default class BarType extends Chart {
    constructor( { name, identifier, attach_target, style, axis_labels, data } ) {
        super( { name, identifier, attach_target, style} );
            //  Minor variables
            this.axisLabels = axis_labels;
            // Resorted/rearranged data from input
            this.data = data;
            this.groupArray = [...new Set( data.map( obj => { return obj.group } ) )];    // [...new Set(array)] automatically removes duplicates from array
            this.keyArray = data.map( obj => { return obj.key } );
            this.valArray = data.map( obj => { return obj.value } );
            //  Important constants
            this.maxVal = Math.max.apply( Math, this.valArray );
            this.yLabelInc = 20;
            // this.yLabelMax = undefined;
            // this.nrLinesMax = undefined;
    }

    //  Methods - shared
    calcGrid() {
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

        // Output storage
        SIBOUTPUT.grid.nrLinesMax = gridMax.nrLinesMax;
        SIBOUTPUT.grid.yLabelMax = gridMax.yLabelMax;
    }

    calcCoords(){
        const xIncrement = Math.round(SIBOUTPUT.CC.width/(this.data.length));
        const yMax = SIBOUTPUT.CC.height * ( this.maxVal / SIBOUTPUT.grid.yLabelMax );

        for(let i=0;i<=this.keyArray.length; i++){
            let x = (this.style.padding + xIncrement/2) + (i * xIncrement);
            let y = SIBOUTPUT.CC.height + ( this.style.padding ) - ((this.valArray[i]/this.maxVal) * yMax);

            //  COORDS output
            SIBOUTPUT.coords.push([x,y]);
        }

        console.log( SIBOUTPUT.coords);
    }

    drawLabel( x, y, xAlign = undefined, yAlign = undefined, label, rotate = undefined ) {
        const rotateFactor = 180 / rotate;
        if ( rotate !== undefined ) {
            SIBOUTPUT.ctx.save();
            SIBOUTPUT.ctx.translate( 0, 0 );
            SIBOUTPUT.ctx.rotate( Math.PI / rotateFactor );
        }

        SIBOUTPUT.ctx.font = `12px Arial`;
        SIBOUTPUT.ctx.fillStyle = 'black'

        /* 
            Alignment:
            - start
            - end
            - left
            - center
            - right
        */
        if ( xAlign !== undefined ) {
            SIBOUTPUT.ctx.textAlign = `${xAlign}`;
            SIBOUTPUT.ctx.textBaseline = `${yAlign}`;
        }

        SIBOUTPUT.ctx.fillText( `${label}`, x, y );

        if ( rotate !== undefined ) {
            SIBOUTPUT.ctx.restore();
        }
    }

    drawAxisLabels() {
        const xAxisLabel = this.axisLabels.x;
        const yAxisLabel = this.axisLabels.y;
        const h = SIBOUTPUT.canvas.height;
        const w = SIBOUTPUT.canvas.width;
        const p = this.style.padding / 2;

        // yAxisLabel
        this.drawLabel( -h / 2, p, 'center', 'middle', yAxisLabel, -90 );
        // xAxisLabel
        this.drawLabel( w / 2, h - p, 'center', 'middle', xAxisLabel );

        // Output storage test
        SIBOUTPUT.labels.axis.push([-h / 2, p, 'center', 'middle', yAxisLabel, -90]);
        SIBOUTPUT.labels.axis.push([w / 2, h - p, 'center', 'middle', xAxisLabel]);
    }

    //  Methods - LAYOUT
    drawGrid() {
        const origin = this.style.padding;
        const w = SIBOUTPUT.CC.width;
        const h = SIBOUTPUT.CC.height;

        // Background
        SIBOUTPUT.ctx.fillStyle = 'rgba(0,0,0,0.1)';
        SIBOUTPUT.ctx.fillRect( origin, origin, w, h );
        // this.ctx.strokeRect( x, y, w, h );

        // Lines & labels
        for ( let i = 0; i <= SIBOUTPUT.grid.nrLinesMax; i++ ) {
            let yPos = origin + ( SIBOUTPUT.CC.height / SIBOUTPUT.grid.nrLinesMax ) * i;
            let xPos = origin;
            let yLabel = SIBOUTPUT.grid.yLabelMax - ( this.yLabelInc * i );

            // The lines
            SIBOUTPUT.ctx.beginPath();
            SIBOUTPUT.ctx.moveTo( xPos, xPos + ( SIBOUTPUT.CC.height / SIBOUTPUT.grid.nrLinesMax ) * i );
            SIBOUTPUT.ctx.lineTo( xPos + SIBOUTPUT.CC.width, yPos );
            SIBOUTPUT.ctx.stroke();

            // The labels
            this.drawLabel( xPos, yPos, 'end', 'middle', yLabel );

            // Output storage test
            SIBOUTPUT.labels.grid.push( [xPos, yPos, 'end', 'middle', yLabel]);
        }
    }

    //  Method - IF SIBLING EXISTS
    _initSiblingProperties() {
        const { grid } = SOC.retrieve( this.identifier );
        SIBOUTPUT.grid.nrLinesMax = grid.nrLinesMax;
        SIBOUTPUT.grid.yLabelMax = grid.yLabelMax;
    }

    //  Method - generate GRID
    layoutGen() {
        if(this.sibExists){
            this._initSiblingProperties();
        } else {
            this.calcGrid();
            this.calcCoords();
            this.drawGrid();
            this.drawAxisLabels();
        }
    }
}