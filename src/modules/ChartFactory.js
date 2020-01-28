import Test from './Chart/Test.js';
import Bar from './Chart/Bar.js';

const CHARTS = {
    Test,
    Bar
}

export default class ChartFactory {
    static create( configObj ) {
        const selectChart = CHARTS[configObj.type];

        if ( configObj ){
            try{
                if(selectChart){
                    new selectChart( configObj ).spawn;
                } else {
                    throw `We don't have ${configObj.type} charts!`
                }
            }catch(err){
                console.error( 'ChartFactory -> ', err )
            }
        } else {
            console.error('ChartFactory -> ', 'No chart parameters provided!');
        }
    }
}
