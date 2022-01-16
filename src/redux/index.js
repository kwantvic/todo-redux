import { createStore, combineReducers  } from 'redux';
import {tasksReducer} from "./reducers/tasks";
import {filterReducer} from "./reducers/filter";



const rootReducer = combineReducers({
  tasks: tasksReducer,
  filter: filterReducer
})


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
