/* Functional/important imports */
import { SiblingContextController as SCC} from './Registry.js';
/* Chart parent import */
import Chart,{SIBCONTEXT} from './Chart.js';

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
        SIBCONTEXT.grid.nrLinesMax = gridMax.nrLinesMax;
        SIBCONTEXT.grid.yLabelMax = gridMax.yLabelMax;
    }

    calcCoords(){
        //--------Standard dimensions--------//
        const xIncrement = Math.round(SIBCONTEXT.CC.width/(this.data.length));
        const yMax = SIBCONTEXT.CC.height * ( this.maxVal / SIBCONTEXT.grid.yLabelMax );
        //--------Grouped dimensions--------//
        const isGrouped = this.style.grouped;
        const grp = (()=>{
            let nrGrps = this.groupArray.length;
            let nrInGrp = this.data.filter((obj) => obj.group === this.groupArray[0]).length;
            let gap = SIBCONTEXT.CC.width * 0.10;
            //let gap = SIBCONTEXT.CC.width /(nrInGrp + nrInGrp + 1);
            let wMax = ((SIBCONTEXT.CC.width - (gap*(nrGrps+1))) / (this.groupArray.length));
            let xInc = Math.round(wMax/(nrInGrp));
            return {
                nrGrps, nrInGrp, gap, wMax, xInc
            }
        })();

        let grpOffset = 0;
        let coordsTemp = [];

        for(let i=0;i<this.data.length; i++){
            let mul = ( grp.nrInGrp - ( ( i ) / grp.nrInGrp ) ) % 1 === 0;
            let x;
            let y = SIBCONTEXT.CC.height + ( this.style.padding ) - ((this.valArray[i]/this.maxVal) * yMax);

            //  Group condition
            if(isGrouped){
                if (mul && i !== 0) grpOffset += grp.gap;
                x = ( this.style.padding + grp.gap ) + ( grp.xInc * i ) + grpOffset ;
            } else {
                x = ( this.style.padding + xIncrement / 2 ) + ( i * xIncrement );
            }

        //    console.log( this.data[i] );
            //  COORDS output
            coordsTemp.push([x,y]);
        }
        SIBCONTEXT.coords = coordsTemp;
        console.log(SIBCONTEXT.coords);
    }

    drawLabel( x, y, xAlign = undefined, yAlign = undefined, label, rotate = undefined ) {
        const rotateFactor = 180 / rotate;
        if ( rotate !== undefined ) {
            SIBCONTEXT.ctx.save();
            SIBCONTEXT.ctx.translate( 0, 0 );
            SIBCONTEXT.ctx.rotate( Math.PI / rotateFactor );
        }

        SIBCONTEXT.ctx.font = `12px Arial`;
        SIBCONTEXT.ctx.fillStyle = 'black'

        /* 
            Alignment:
            - start
            - end
            - left
            - center
            - right
        */
        if ( xAlign !== undefined ) {
            SIBCONTEXT.ctx.textAlign = `${xAlign}`;
            SIBCONTEXT.ctx.textBaseline = `${yAlign}`;
        }

        SIBCONTEXT.ctx.fillText( `${label}`, x, y );

        if ( rotate !== undefined ) {
            SIBCONTEXT.ctx.restore();
        }
    }

    drawAxisLabels() {
        const xAxisLabel = this.axisLabels.x;
        const yAxisLabel = this.axisLabels.y;
        const h = SIBCONTEXT.canvas.height;
        const w = SIBCONTEXT.canvas.width;
        const p = this.style.padding / 2;

        // yAxisLabel
        this.drawLabel( -h / 2, p, 'center', 'middle', yAxisLabel, -90 );
        // xAxisLabel
        this.drawLabel( w / 2, h - p, 'center', 'middle', xAxisLabel );

        // Output storage test
        SIBCONTEXT.labels.axis.push([-h / 2, p, 'center', 'middle', yAxisLabel, -90]);
        SIBCONTEXT.labels.axis.push([w / 2, h - p, 'center', 'middle', xAxisLabel]);
    }

    //  Methods - LAYOUT
    drawGrid() {
        const origin = this.style.padding;
        const w = SIBCONTEXT.CC.width;
        const h = SIBCONTEXT.CC.height;

        // Background
        SIBCONTEXT.ctx.fillStyle = 'rgba(0,0,0,0.1)';
        SIBCONTEXT.ctx.fillRect( origin, origin, w, h );
        // this.ctx.strokeRect( x, y, w, h );

        // Lines & labels
        for ( let i = 0; i <= SIBCONTEXT.grid.nrLinesMax; i++ ) {
            let yPos = origin + ( SIBCONTEXT.CC.height / SIBCONTEXT.grid.nrLinesMax ) * i;
            let xPos = origin;
            let yLabel = SIBCONTEXT.grid.yLabelMax - ( this.yLabelInc * i );

            // The lines
            SIBCONTEXT.ctx.beginPath();
            SIBCONTEXT.ctx.moveTo( xPos, xPos + ( SIBCONTEXT.CC.height / SIBCONTEXT.grid.nrLinesMax ) * i );
            SIBCONTEXT.ctx.lineTo( xPos + SIBCONTEXT.CC.width, yPos );
            SIBCONTEXT.ctx.stroke();

            // The labels
            this.drawLabel( xPos, yPos, 'end', 'middle', yLabel );

            // Output storage test
            SIBCONTEXT.labels.grid.push( [xPos, yPos, 'end', 'middle', yLabel]);
        }
    }

    //  Method - IF SIBLING EXISTS
    _initSiblingProperties() {
        const { grid } = SCC.retrieve( this.identifier );
        SIBCONTEXT.grid.nrLinesMax = grid.nrLinesMax;
        SIBCONTEXT.grid.yLabelMax = grid.yLabelMax;
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
            SCC.store(SIBCONTEXT);
        }
    }
}