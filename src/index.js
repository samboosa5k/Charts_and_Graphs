import ChartFactory from './modules/ChartFactory.js';

const binds = () => {
    //  Chart functions
    window.ChartCreate = ChartFactory.create;
}

const logs = () => {
    //  Library loads
    console.log( 'Init -> ', 'Charts library loaded :)' );
    console.log( 'Init -> ', 'If you see "undefined" in the console after creating a new chart, this is from the Factory' );
}

const init = () => {
    binds();
    logs();       
}

init();

/* Test Spawn */
document.addEventListener('DOMContentLoaded',()=>{
    ChartCreate( { type: 'Test', name: 'test-chart' } );
})

