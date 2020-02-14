/* Functional/important imports */
import { SiblingContextController as SCC } from '../Registry.js';
/* Chart parent -> Specialized import */
import { SIBCONTEXT } from '../Chart.js';
import BarType from '../BarType.js';

/* 
    Child class: 'Bar'
*/

export default class Bar extends BarType {
    constructor( inputObj ) {
        super( inputObj );
        this.buildChartMethod = this.init;
        this.yLabelInc = 20;
    }


    //  Methods - SECONDARY
    drawBar( x, y, w, h, color ) {
        SIBCONTEXT.ctx.fillStyle = color;
        SIBCONTEXT.ctx.fillRect( x, y, w, h );
        //this.ctx.strokeRect( x, y, w, h );
    }

    //  Method - generate BARS
    barGen() {
        const colorPattern = SIBCONTEXT.style.color_pattern;
        const chartColors = SIBCONTEXT.style.chart_colors;
        //const maxW = Math.floor((SIBCONTEXT.CC.width / this.data.length));
        const maxW = SIBCONTEXT.coords[1][0] - SIBCONTEXT.coords[0][0];
        const barW = maxW / 1.6;

        // LOOP START
        for ( let i = 0; i < this.keyArray.length; i++ ) {
            //-----SIBCONTEXT COORDINATE BASED DIMENSIONS-----//
            let x = SIBCONTEXT.coords[i][0];
            let y = SIBCONTEXT.coords[i][1];
            //-------END---------//
            let barH = SIBCONTEXT.CC.height - (y - SIBCONTEXT.style.padding);
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
        if ( this.sibExists ) {
            this.barGen();
        } else {
            this.layoutGen();
            this.barGen();
        }
    }
}
