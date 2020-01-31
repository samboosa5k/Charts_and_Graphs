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
const testData = [
    {key: 'product_1', count: 12},
    {key: 'product_2', count: 33},
    {key: 'product_3', count: 55},
    {key: 'product_4', count: 78},
    {key: 'product_5', count: 100},
    {key: 'product_6', count: 122},
    {key: 'product_7', count: 134},
];

//  2. Event listener to spawn chart
document.addEventListener('DOMContentLoaded',()=>{
    ChartCreate( { type: 'Bar', name: 'test-bar-chart', input: testData } );
})

