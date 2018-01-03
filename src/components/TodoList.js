import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './ViewTodo';

const TodoList = ({ todos,  onTodoClick, onTodoDelete, onTodoEdit, onLoadTags}) => {

  	return <div className="todo-list">
  	  <ul>
	    {todos.map(todo =>
		      <Todo 
		        key={todo.id}
		        { ...{
		        ...todo,
		        onEdit: (text) => onTodoEdit(todo.id, text),
		        onClick:() => onTodoClick(todo.id),
		        onDelete:() => onTodoDelete(todo.id)
		    	}}
		      />
	    )}
	  </ul>
    </div>;
};

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
  onTodoEdit: PropTypes.func.isRequired,
  onLoadTags: PropTypes.func.isRequired
};

export default TodoList;
