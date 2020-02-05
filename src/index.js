import {ChartController} from './modules/ChartRegistry.js';
import {ChartFactory} from './modules/ChartFactory.js';

const binds = () => {
    //  Chart functions
    window.ChartCreate = ChartFactory.create;
    window.ChartGet = ChartController.access;
}

const logs = () => {
    //  Library loads
    console.log( 'Init -> ', 'Charts library loaded :)' );
    console.log( 'Init -> ', 'If you see "undefined" in the console after creating a new chart, this is from the Factory' );
}

const init = () => {
    binds();
    //logs();       
}

init();

/* Test Spawn */
//  1. Test data
//  2. data => array of objects
//          => key & val MANDATORY
//          => group property OPTIONAL (should be checked in buildMethod)
const testInput = {
    type: 'Bar',
    name: 'test-bar-chart',
    attach_target: '#test_target',
    style:{
        grouped: true,
        padding: 64,
        chart_colors: ['Azure','CornflowerBlue','Coral','DarkSeaGreen'],
        color_pattern: 'alternating',   // 'alternating' or 'grouped'
    },
    axis_labels: {
        x: 'Products', 
        y: 'Units sold'
    },
    data:[
        {group: 'Product_A', key: 'Q1', value: 40},
        {group: 'Product_A', key: 'Q2', value: 50},
        {group: 'Product_A', key: 'Q3', value: 7},
        {group: 'Product_A', key: 'Q4', value: 22},
        {group: 'Product_B', key: 'Q1', value: 44},
        {group: 'Product_B', key: 'Q2', value: 66},
        {group: 'Product_B', key: 'Q3', value: 150},
        {group: 'Product_B', key: 'Q4', value: 166},
        {group: 'Product_C', key: 'Q1', value: 13},
        {group: 'Product_C', key: 'Q2', value: 100},
        {group: 'Product_C', key: 'Q3', value: 25},
        {group: 'Product_C', key: 'Q4', value: 16},
        {group: 'Product_D', key: 'Q1', value: 11},
        {group: 'Product_D', key: 'Q2', value: 34},
        {group: 'Product_D', key: 'Q3', value: 144},
        {group: 'Product_D', key: 'Q4', value: 88},
    ]
}

//  2. Event listener to spawn chart
document.addEventListener('DOMContentLoaded',()=>{
    ChartCreate( testInput );
})

