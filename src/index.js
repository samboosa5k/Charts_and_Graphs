import {ChartController, SiblingOutputController as SOC} from './modules/Registry.js';
import {ChartFactory} from './modules/ChartFactory.js';

//------------Test data------------//
const chartInput = {
    type: 'Bar',
    name: 'bar-chart',
    identifier: 'chartID',
    attach_target: '#test_target',
    style: {
        grouped: false,
        padding: 64,
        chart_colors: ['Azure', 'CornflowerBlue', 'Coral', 'DarkSeaGreen'],
        color_pattern: 'alternating',   // 'alternating' or 'grouped'
    },
    axis_labels: {
        x: 'Products',
        y: 'Units sold'
    },
    data: [
        { group: 'Product_A', key: 'Q1', value: 40 },
        { group: 'Product_A', key: 'Q2', value: 50 },
        { group: 'Product_A', key: 'Q3', value: 7 },
        { group: 'Product_A', key: 'Q4', value: 22 },
        { group: 'Product_B', key: 'Q1', value: 44 },
        { group: 'Product_B', key: 'Q2', value: 66 },
        { group: 'Product_B', key: 'Q3', value: 150 },
        { group: 'Product_B', key: 'Q4', value: 166 },
        { group: 'Product_C', key: 'Q1', value: 13 },
        { group: 'Product_C', key: 'Q2', value: 100 },
        { group: 'Product_C', key: 'Q3', value: 25 },
        { group: 'Product_C', key: 'Q4', value: 16 },
        { group: 'Product_D', key: 'Q1', value: 11 },
        { group: 'Product_D', key: 'Q2', value: 34 },
        { group: 'Product_D', key: 'Q3', value: 144 },
        { group: 'Product_D', key: 'Q4', value: 88 },
    ]
}
const testInput = {
    type: 'Line',
    name: 'line-chart',
    identifier: 'chartID',
    attach_target: '#test_target',
    style: {
        grouped: false,
        padding: 64,
        chart_colors: ['Azure', 'CornflowerBlue', 'Coral', 'DarkSeaGreen'],
        color_pattern: 'alternating',   // 'alternating' or 'grouped'
    },
    axis_labels: {
        x: 'Products',
        y: 'Units sold'
    },
    data: [
        { group: 'Product_A', key: 'Q1', value: 40 },
        { group: 'Product_A', key: 'Q2', value: 50 },
        { group: 'Product_A', key: 'Q3', value: 7 },
        { group: 'Product_A', key: 'Q4', value: 22 },
        { group: 'Product_B', key: 'Q1', value: 44 },
        { group: 'Product_B', key: 'Q2', value: 66 },
        { group: 'Product_B', key: 'Q3', value: 150 },
        { group: 'Product_B', key: 'Q4', value: 166 },
        { group: 'Product_C', key: 'Q1', value: 13 },
        { group: 'Product_C', key: 'Q2', value: 100 },
        { group: 'Product_C', key: 'Q3', value: 25 },
        { group: 'Product_C', key: 'Q4', value: 16 },
        { group: 'Product_D', key: 'Q1', value: 11 },
        { group: 'Product_D', key: 'Q2', value: 34 },
        { group: 'Product_D', key: 'Q3', value: 144 },
        { group: 'Product_D', key: 'Q4', value: 88 },
    ]
}
//------------Test data end------------//

const binds = async () => {
    console.log('index.js => ', 'Binds have been set');
    //  Chart functions
    window.ChartCreate = ChartFactory.create;
    
    //  Controller functions
    window.ChartGet = ChartController.access;
    window.StorageGet = SOC.retrieve;
}

const bindsSecondary = async () => {
    window.chart1 = () => ChartCreate( chartInput );
    window.chart2 = () => ChartCreate( testInput );
}

document.addEventListener('DOMContentLoaded', async ()=>{
    await binds()
    .then(()=>{bindsSecondary()})
    .then(()=> { /* chart1(); */ chart2() });
})



