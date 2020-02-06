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

/*
    Sibling Output Registry:
        - For storing generated data by similar sibling instances, so that the data can 
        be reused/shared to avoid duplicate loops etc.
*/

export const SiblingOutputStorage = [

];

export const SiblingOutputController = ( () => {
    const store = ( outputObj ) => {
        SiblingOutputStorage.push( outputObj );
    }
    const retrieve = ( identifier ) => SiblingOutputStorage.find( ( outputObj ) => outputObj.identifier === identifier );

    return {
        store,
        retrieve,
    }
} )();