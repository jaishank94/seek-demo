
let initialState = {
    userData: { name: "" },
    isLoading: false,
    error: null
}

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_AUTH_START':
            return Object.assign({}, state, { isLoading: true })
        case 'LOAD_AUTH_SUCCESS':
            return Object.assign({}, state, { userData: action.payload, isLoading: false })
        case 'LOAD_AUTH_FAILURE':
            return Object.assign({}, state, { error: action.payload, isLoading: false })
        default:
            return state
    }
}