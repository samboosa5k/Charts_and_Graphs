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
        padding: 64,
        chart_colors: ['Lavender','CornflowerBlue','Coral','DarkSeaGreen']
    },
    axis_labels: {
        x: 'Products', 
        y: 'Units sold'
    },
    data:[
        {group: 'one', key: 'product_1', value: 4},
        {group: 'one', key: 'product_2', value: 5},
        {group: 'one', key: 'product_3', value: 7},
        {group: 'one', key: 'product_4', value: 22},
        {group: 'two', key: 'product_5', value: 44},
        {group: 'two', key: 'product_6', value: 66},
        {group: 'two', key: 'product_7', value: 193},
        {group: 'two', key: 'product_8', value: 240},
    ]
}

//  2. Event listener to spawn chart
document.addEventListener('DOMContentLoaded',()=>{
    ChartCreate( testInput );
})

