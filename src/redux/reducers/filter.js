const initialState = 0

export function filterReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FILTER': {
            return state = action.payload.activeFilter
        }
    }
    return state;
}
