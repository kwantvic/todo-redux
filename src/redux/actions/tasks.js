export const addTask = (text, completed) => {
    return {
        type: 'ADD_TASK',
        payload: {
            text,
            completed
        }
    }
}
export const dellAll = () => {
    return {
        type: 'REMOVE_ALL',
    }
}
export const select = (isToggleBtn) => {
    return {
        type: isToggleBtn ? 'SELECT_ALL' : 'DESELECT_ALL'
    }
}
export const delTask = (idTask) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            id: idTask,
        }
    }
}
export const editTask = (idTask, newText) => {
    return {
        type: 'EDIT_TASK',
        payload: {
            id: idTask,
            text: newText
        }
    }
}
export const complete = (idTask) => {
    return {
        type: 'TOGGLE_COMPLETED',
        payload: {
            id: idTask,
        }
    }
}