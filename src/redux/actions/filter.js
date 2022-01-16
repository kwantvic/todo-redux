export const setFilter = (num) => {
    return {
        type: 'SET_FILTER',
        payload: {
            activeFilter: num
        }
    }
}