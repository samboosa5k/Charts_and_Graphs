/* Functional/important imports */
import { SiblingContextController as SCC } from '../Registry.js';
/* Chart parent -> Specialized import */
import { SIBCONTEXT } from '../Chart.js';
import BarType from '../BarType.js';

/* 
    Child class: 'Test'
*/

export default class Line extends BarType {
    constructor( { name, identifier, attach_target, style, axis_labels, data} ) {
        super( { name, identifier, attach_target, style, axis_labels, data} );
        this.buildChartMethod = this.init;
        this.maxVal = Math.max.apply( Math, this.valArray );
        this.yLabelInc = 20;
        this.yLabelMax = undefined;
        this.nrLinesMax = undefined;
    }


    //  Methods - SECONDARY
    drawLine( x, y, x2, y2, color ) {
        SIBCONTEXT.ctx.beginPath();
        // test
        SIBCONTEXT.ctx.moveTo(x,y);
        SIBCONTEXT.ctx.lineTo(x,SIBCONTEXT.CC.height + this.style.padding);
        // real
        SIBCONTEXT.ctx.moveTo( x, y );
        SIBCONTEXT.ctx.lineTo(x2,y2);
        SIBCONTEXT.ctx.stroke();
    }

    //  Method - generate BARS
    lineGen() {
        for(let i=0; i<SIBCONTEXT.coords.length-1; i++){
            let x = SIBCONTEXT.coords[i][0];
            let y = SIBCONTEXT.coords[i][1];
            let x2 = SIBCONTEXT.coords[i+1][0];
            let y2 = SIBCONTEXT.coords[i+1][1];
            this.drawLine(x,y,x2,y2);
        }      
    }

    init() {
        console.log('line -> sibexists? ', this.sibExists);
        if ( this.sibExists ) {
            this.lineGen();
        } else {
            this.layoutGen();
            this.lineGen();
        }
    }
}
