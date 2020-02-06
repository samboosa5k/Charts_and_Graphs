/* Functional/important imports */
import {ChartController} from './Registry.js';
/* Chart imports */
import Line from './BarType/Line.js';
import Bar from './BarType/Bar.js';

const CHARTS = {
    Line,
    Bar
}

const ChartFactory = (()=>{
    const create = ( configObj ) => {
        const selectChart = CHARTS[configObj.type];
        const chartName = configObj.name;

        if ( configObj ){
            try{
                if(selectChart && chartName)
                {
                    // New chart instance
                    let newChart = new selectChart( configObj );
                    // Register new chart instance
                    ChartController.register(
                        {
                            name:`${chartName}`, 
                            chart: newChart
                        }
                    );
                    // Spawn the chart
                    return newChart.spawn;
                } 
                else if ( selectChart && !chartName ) 
                {
                    throw 'You must provide a "type:" and "name:" parameter'
                } 
                else if ( !selectChart && chartName )
                {
                    throw `We don't have ${configObj.type} charts!`
                } 
                else 
                {
                    throw 'You must provide a "type:" and "name:" parameter'
                } 
            } catch(err){
                console.error( 'ChartFactory -> ', err )
            }
        } else {
            console.error('ChartFactory -> ', 'No chart parameters provided!');
        }
    }

    return {
        create
    }
})();

export {ChartFactory};