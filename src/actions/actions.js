export function loadData(dispatch, data){
    dispatch({
        type: 'LOAD_DATA',
        data
    })
}

export function limitData(dispatch, offset, limit){
    dispatch({
        type: 'LIMIT_DATA',
        offset,
        limit
    })
}

export function sortData(dispatch, sortField, sortType){
    dispatch({
        type: 'SORT_DATA',
        sortField,
        sortType
    })
}