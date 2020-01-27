import Bar from './Chart/Bar.js';

const CHARTS = {
    Bar
}

export default class ChartFactory {
    factoryError(error){
        console.error('ChartFactory: ', `We don't have ${error} charts!`)
    }

    static create(dataObj){
        const chartCreator = CHARTS[dataObj.type];
        const chart = (chartCreator) ? new chartCreator(dataObj.name, dataObj.input, undefined) : this.factoryError(dataObj.type);

        return chart;
    }
}

window.ChartCreate = ChartFactory.create;