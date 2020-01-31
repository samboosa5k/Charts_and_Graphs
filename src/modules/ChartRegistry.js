/* 
    Chart Registry:
        - For storing all chart instances, so that the instance methods
        can be accessed later
*/

export const ChartRegistry = [

];

export const ChartController = (()=>{
    const register = (chartObj) => ChartRegistry.push(chartObj);
    const access = (chartName) => ChartRegistry.find((chartInstance) => chartInstance.name === chartName);
    
    return {
        register,
        access
    }
})();