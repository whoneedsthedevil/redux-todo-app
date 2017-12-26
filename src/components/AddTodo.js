import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const AddTodo = ({ dispatch }) => {
  let task, points;

  return (
    <div className="add-input">
      <div className="labels">
       <div className="task-text">
         title
       </div>
       <div className="task-points">
         points
       </div>
       
      </div>  
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!task.value.trim()) {
            return;
          }
          dispatch(addTodo(task.value, points.value));
          task.value = '';
          points.value = 0;
        }}
      >
        <input ref={node => { task = node; }} className="task-text" />
        <input type="number" min="0" ref={node => { points = node; points.value = 0; }} className="task-points" />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddTodo);
