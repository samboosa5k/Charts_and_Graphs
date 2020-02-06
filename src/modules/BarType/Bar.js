/* Functional/important imports */
import { SiblingOutputController as SOC } from '../Registry.js';
/* Chart parent -> Specialized import */
import { SIBOUTPUT } from '../Chart.js';
import BarType from '../BarType.js';

/* 
    Child class: 'Bar'
*/

export default class Bar extends BarType {
    constructor( { name, identifier, attach_target, style, axis_labels, data} ) {
        super( { name, identifier, attach_target, style, axis_labels, data} );
        this.buildChartMethod = this.init;
        // this.maxVal = Math.max.apply( Math, this.valArray );
        this.yLabelInc = 20;
        this.yLabelMax = undefined;
        this.nrLinesMax = undefined;
    }


    //  Methods - SECONDARY
    drawBar( x, y, w, h, color ) {
        SIBOUTPUT.ctx.fillStyle = color;
        SIBOUTPUT.ctx.fillRect( x, y, w, h );
        //this.ctx.strokeRect( x, y, w, h );
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
        const maxW = Math.floor((SIBOUTPUT.CC.width / this.data.length));
        const maxH = SIBOUTPUT.CC.height * ( this.maxVal / SIBOUTPUT.grid.yLabelMax);
        const barW = maxW / 1.6;
        const maxGroupW = Math.floor(SIBOUTPUT.CC.width / this.groupArray.length);
        const groupCenter = -( maxGroupW / 2 ) + SIBOUTPUT.CC.width / ( this.groupArray.length + 1);

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
            let yOffset = SIBOUTPUT.CC.height + ( this.style.padding ) - barH;
            
            // Final offset
            let xPosBar = xOffset - ( barW / 2 ) + ( maxW / 2 ) + currGroupOffset;
            let xPosLabel = xOffset + ( maxW / 2 ) + currGroupOffset;
            let yPosLabel = SIBOUTPUT.CC.height + this.style.padding;

            //  Bars
            this.drawBar( xPosBar, yOffset, barW, barH, barColor );
            SIBOUTPUT.bars.push( [xPosBar, yOffset, barW, barH, barColor] );

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
    
    init() {
        this.layoutGen();
        this.barGen();
    }
}
