import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';
import sagaRequests from './sagaRequests';

const todoApp = combineReducers({
  todos, sagaRequests
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);