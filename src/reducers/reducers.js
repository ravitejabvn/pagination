export default function planetStore(state = {}, action){

    switch(action.type) {
        case 'LOAD_DATA' : 
            return Object.assign({}, state, {
                data: action.data,
                offset: 0,
                limit: 10,
                dataObj : {
                    sortType: '',
                    sortField: '',
                    data: []
                }
            });

        case 'LIMIT_DATA' :
            var currentState = JSON.parse(JSON.stringify(state));
            var offset = action.offset;
            var limit = action.limit;
            var retState = getOffsetRecords(currentState, offset, limit);
            return retState;
            
        case 'SORT_DATA' :
            var crntState = JSON.parse(JSON.stringify(state));
            var sortField = action.sortField;
            var sortType = action.sortType;
            var sortState = getSortingData(crntState, sortField, sortType);
            var ofset = crntState.offset;
            var lmt = crntState.limit;
            let retrnState = getOffsetRecords(sortState, ofset, lmt);
            return retrnState;

        default:
    }

    return state;
}

function getOffsetRecords(currentState, offset, limit){
    let dataSet = currentState.data;
    var offsetVal = offset;
    var lt = offsetVal + limit;
    var data = [];
    for(var v=offsetVal; v<lt; v++){
        data.push(dataSet[v]);
    }
    currentState.offset = offset;
    currentState.limit = limit;
    currentState.dataObj.data = data;

    return currentState;
}

function getSortingData(currentState, sortField, sortType) {
    let dataSet = currentState.data;
    if(sortType === 'atoz'){
        dataSet.sort((a,b) => (a[sortField] > b[sortField]) ? 1 : ((b[sortField] > a[sortField]) ? -1 : 0));
    } else {
        dataSet.sort((a,b) => (b[sortField] > a[sortField]) ? 1 : ((a[sortField] > b[sortField]) ? -1 : 0));
    }
    currentState.data = dataSet;
    currentState.dataObj.sortField = sortField;
    currentState.dataObj.sortType = sortType;
    return currentState;
}

// function getQueryResults(currentState, queryType, queryValue){
//     var planets = currentState.planets;
//     var regex = typeof queryType == 'string' ? queryValue+'\\w?' : queryValue+'\\d';

//     var filterdObj = planets.filter(x => x[queryType].match(new RegExp(regex, 'g')) );
//     setBookmarkUrl(currentState, queryType, queryValue);
//     currentState.planetObj.data = filterdObj;
    
//     return currentState;
// }