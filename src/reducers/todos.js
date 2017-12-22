import { combineReducers } from 'redux';
import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
    case 'EDIT_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    case 'DELETE_TODO':
      if (state.id === action.id) {
        return { [action.id]: todo(state[action.id], action) }
      }
    case 'LOAD_TAGS_SUCCESS':
      console.log('%c Current task is:', 'color: DarkOrange', action.taskRequest.text)
      return state;

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    case 'DELETE_TODO':
      let index = state.indexOf(action.id);
      return state.filter((x, i) => i !== index); 
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds,
});


export default todos;

const getAllTodos = (state) => 
  state.allIds.map(id => state.byId[id]);


export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all':
      return allTodos;
    case 'completed':
      return allTodos.filter(t => t.completed);
    case 'active':
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};