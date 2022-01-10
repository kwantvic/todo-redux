import { createStore } from 'redux';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      return [
        ...state,
        {
          id: state.length ? state[state.length - 1].id + 1 : 1,
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ];
    }
    case 'REMOVE_TASK': {
      return state.filter((item) => item.id !== action.payload.id);
    }
    case 'EDIT_TASK': {
      return state.map((obj) =>
        obj.id === action.payload.id
          ? {
              ...obj,
              text: action.payload.text,
            }
          : obj,
      );
    }
    case 'TOGGLE_COMPLETED': {
      return state.map((obj) =>
        obj.id === action.payload.id
          ? {
              ...obj,
              completed: !obj.completed,
            }
          : obj,
      );
    }
    case 'REMOVE_ALL': {
      return [];
    }
    case 'SELECT_ALL': {
      return state.map((obj) => ({
        ...obj,
        completed: true,
      }));
    }
    case 'DESELECT_ALL': {
      return state.map((obj) => ({
        ...obj,
        completed: false,
      }));
    }
  }
  return state;
}

const store = createStore(reducer, []);

export default store;
