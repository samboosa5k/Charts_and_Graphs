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
        // this.yLabelMax = undefined;
        // this.nrLinesMax = undefined;
    }


    //  Methods - SECONDARY
    drawBar( x, y, w, h, color ) {
        SIBOUTPUT.ctx.fillStyle = color;
        SIBOUTPUT.ctx.fillRect( x, y, w, h );
        //this.ctx.strokeRect( x, y, w, h );
    }

    //  Method - generate BARS
    barGen() {
        const colorPattern = this.style.color_pattern;
        const chartColors = this.style.chart_colors;
        const maxW = Math.floor((SIBOUTPUT.CC.width / this.data.length));
        const barW = maxW / 1.6;

        // LOOP START
        for ( let i = 0; i < this.keyArray.length; i++ ) {
            //  Variables
            //-------NEW---------//
            let x = SIBOUTPUT.coords[i][0];
            let y = SIBOUTPUT.coords[i][1];
            //-------END---------//
            let barH = SIBOUTPUT.CC.height - (y - this.style.padding);
            // let barH = ( this.valArray[i] / this.maxVal ) * maxH;
            let barLabel = this.keyArray[i];
            let barColor = ( colorPattern === 'grouped' ) ?
                chartColors[this.groupArray.indexOf(this.data[i].group)] :
                chartColors[i % chartColors.length];
    

            //  Bars
            this.drawBar( x - barW / 2, y, barW, barH, barColor );

            //  BAR label
            this.drawLabel( x, y + barH, 'center', 'hanging', barLabel );
        }
        // LOOP END
    }
    
    init() {
        console.log( 'bar -> sibexists? ', this.sibExists );
        if ( this.sibExists ) {
            this.barGen();
        } else {
            this.layoutGen();
            this.barGen();
        }
    }
}
