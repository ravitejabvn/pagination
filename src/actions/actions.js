import {getData} from './../middleware/sagas';

export function fetchData(dispatch, url, offset, limit) {
    getData(url).then(res => {
        const data = res.data;
        dispatch({
            type: 'LOAD_DATA',
            data
        });
        dispatch({
            type: 'LIMIT_DATA',
            offset,
            limit
        });
    });
}

// export function loadData(dispatch, data){
//     dispatch({
//         type: 'LOAD_DATA',
//         data
//     })
// }

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