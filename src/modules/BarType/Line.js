/* Functional/important imports */
import { SiblingOutputController as SOC } from '../Registry.js';
/* Chart parent -> Specialized import */
import { SIBOUTPUT } from '../Chart.js';
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
        SIBOUTPUT.ctx.beginPath();
        // test
        SIBOUTPUT.ctx.moveTo(x,y);
        SIBOUTPUT.ctx.lineTo(x,SIBOUTPUT.CC.height + this.style.padding);
        // real
        SIBOUTPUT.ctx.moveTo( x, y );
        SIBOUTPUT.ctx.lineTo(x2,y2);
        SIBOUTPUT.ctx.stroke();
    }

    //  Method - generate BARS
    lineGen() {
        for(let i=0; i<SIBOUTPUT.coords.length-1; i++){
            let x = SIBOUTPUT.coords[i][0];
            let y = SIBOUTPUT.coords[i][1];
            let x2 = SIBOUTPUT.coords[i+1][0];
            let y2 = SIBOUTPUT.coords[i+1][1];
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
