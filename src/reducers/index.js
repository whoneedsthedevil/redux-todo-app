import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';
import sagaData from './sagaRequests';

const todoApp = combineReducers({
  todos, sagaData
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);