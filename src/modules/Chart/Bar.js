import Chart from '../Chart.js';


/* 
    Child class: 'Bar'
*/

export default class Bar extends Chart {
    constructor( { name, attach_target, style, axis_labels, data} ) {
        super( { name, attach_target, style, axis_labels, data} );
        this.buildChartMethod = this.init;
        this.maxVal = Math.max.apply( Math, this.valArray );
        this.yLabelInc = 20;
        this.yLabelMax = undefined;
        this.nrLinesMax = undefined;
    }


    //  Methods - SECONDARY
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

    drawBar( x, y, w, h, color ) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect( x, y, w, h );
        //this.ctx.strokeRect( x, y, w, h );
    }

    //  Methods - PRIMARY
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
    barGen() {
        /* 
            Variables:
            - colorPattern -> the chosen color pattern
            - maxW -> the absolute MAX WIDTH a single bar can be
            - maxH -> the absolute MAX HEIGHT a single bar can be
            - barW -> independent width scaling
            - maxGroupW -> the absolute MAX WIDTH a bar-group can be
            - groupGap -> calculate additional group offset, when bars are not 100% wide

             minus-((barW*(this.keyArray.length/this.groupArray.length))/2)+maxGroupW/2
        */
        const colorPattern = this.style.color_pattern;
        const chartColors = this.style.chart_colors;
        const maxW = Math.floor((this.CC.width / this.data.length));
        const maxH = this.CC.height * ( this.maxVal / this.yLabelMax);
        const barW = maxW / 1.6;
        const maxGroupW = Math.floor(this.CC.width / this.groupArray.length);
        const groupCenter = -( maxGroupW / 2 ) + this.CC.width / ( this.groupArray.length + 1);

        // Increment X-offset for bar groups
        let currGroupOffset = 0;
        let currGroupChildren = 0;

        // LOOP START
        for ( let i = 0; i < this.keyArray.length; i++ ) {
            //  Variables
            let barH = ( this.valArray[i] / this.maxVal ) * maxH;
            let barLabel = this.keyArray[i];
            let barColor = ( colorPattern === 'grouped' ) ?
                chartColors[this.groupArray.indexOf(this.data[i].group)] :
                chartColors[i % chartColors.length];
            //  Check if it's a new group
            let isNewGroup = ( () => {
                if ( i > 0 && i < this.keyArray.length ) {
                    if ( this.data[i].group !== this.data[i - 1].group ) {
                        return true;
                    }
                } else {
                    return false;
                }
            } )();          

            // Add GROUP offset if grouped is on
            if(this.style.grouped){
                 if ( i === 0 || isNewGroup) {
                    currGroupOffset += groupCenter;
                    currGroupChildren = this.data.filter(obj => { return obj.group === this.data[i].group}).length;
                }
            }

            // Initial offset
            /* 
                wModifier -> this is needed because when bars are grouped/ungrouped,
                the distribution changes from being 'spread evenly' to being
                'clustered together' & 'spread groups evenly'
            */
            let wModifier = ( this.style.grouped ) ? barW : maxW;
            let xOffset = ( this.style.padding ) + ( i * wModifier );
            let yOffset = this.CC.height + ( this.style.padding ) - barH;
            
            // Final offset
            let xPosBar = xOffset - ( barW / 2 ) + ( maxW / 2 ) + currGroupOffset;
            let xPosLabel = xOffset + ( maxW / 2 ) + currGroupOffset;
            let yPosLabel = this.CC.height + this.style.padding;

            //  Bars
            this.drawBar( xPosBar, yOffset, barW, barH, barColor );

            //  BAR label
            this.drawLabel( xPosLabel, yPosLabel, 'center', 'hanging', barLabel );

            //  GROUP label
            if ( this.style.grouped ) {
                if ( i === 0 || isNewGroup ) {
                    this.drawLabel( xPosBar + barW*(currGroupChildren/2), yPosLabel+16, 'center', 'hanging', this.data[i].group);
                }
            }
        }
        // LOOP END
    }

    //  Method - generate GRID
    layoutGen() {
        this.calcGrid();
        this.drawGrid();
        this.drawAxisLabels();
    }
    
    init() {
        this.layoutGen();
        this.barGen();
    }
}
