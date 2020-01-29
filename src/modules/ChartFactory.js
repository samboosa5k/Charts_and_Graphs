import Test from './Chart/Test.js';
import Bar from './Chart/Bar.js';

const CHARTS = {
    Test,
    Bar
}

export default class ChartFactory {
    static create( configObj ) {
        const selectChart = CHARTS[configObj.type];
        const chartName = configObj.name;

        if ( configObj ){
            try{
                if(selectChart && chartName){
                    new selectChart( configObj ).spawn;
                } else if ( selectChart && !chartName ) {
                    throw 'You must provide a "type:" and "name:" parameter'
                } else if ( !selectChart && chartName ){
                    throw `We don't have ${configObj.type} charts!`
                } else {
                    throw 'You must provide a "type:" and "name:" parameter'
                } 
            } catch(err){
                console.error( 'ChartFactory -> ', err )
            }
        } else {
            console.error('ChartFactory -> ', 'No chart parameters provided!');
        }
    }
}
