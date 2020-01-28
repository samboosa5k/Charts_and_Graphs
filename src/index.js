import ChartFactory from './modules/ChartFactory.js';

const init = () => {
    window.ChartCreate = ChartFactory.create;
    console.log('Init -> ','Charts library loaded :)');
    console.log('Init -> ','If you see "undefined" in the console after creating a new chart, this is from the Factory');
}
init();