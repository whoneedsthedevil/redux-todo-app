import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo, deleteTodo, editTodo } from '../actions';
import { getVisibleTodos } from '../reducers'
import TodoList from './TodoList';

const mapStateToProps = (
  state,
  { match: { params: { filter } } }
) => ({
  todos: getVisibleTodos(state, filter || 'all'),
});


const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
  onTodoDelete(id) {
  	dispatch(deleteTodo(id));
  },
  onTodoEdit(id, text){
    dispatch(editTodo(id, text));
  },
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;
