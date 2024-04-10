let initialState = {
    sort: null,
    genreId: null
}

//state, action
function reducer(state=initialState, action){
    if (action.type === 'SELECT-FILTER'){
        return {...state, sort : action.payload.sort, genreId : action.payload.genreId}
    }
    return {...state}
}

export default reducer;