import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './ViewTodo';

// const TodoList = ({ todos, onTodoClick, onTodoDelete, onEditFlag}) => {
export default class TodoList extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.setEdit = this.setEdit.bind(this)
    this.state = { isEdit: false }
  }

  setEdit(isEdit) {
    this.setState({ isEdit })
  }


  render() {

  const { todos, onTodoClick, onTodoDelete, onTodoEdit } = this.props
  const { isEdit } = this.state
  	return <ul>
	    {todos.map(todo =>
	      isEdit === false ?
		      <Todo 
		        key={todo.id}
		        { ...{
		      	...this.props,
		        ...todo,
		        onEdit: (text) => onTodoEdit(todo.id, text),
		        onClick:() => onTodoClick(todo.id),
		        onDelete:() => onTodoDelete(todo.id)
		    	}}
		      />
	      :
	      	<div 
		      key={todo.id} 
		      onClick={() => this.setEdit(false)}> 
		        Edit available {todo.text}
	        </div>
	      
	    )}
	  </ul>;
	}
};

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
  onTodoEdit: PropTypes.func.isRequired,
};

