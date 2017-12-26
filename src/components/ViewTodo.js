import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/fontawesome-free-solid'

class Todo extends Component { 
  constructor(props, context) {
    super(props, context)
    this.setEdit = this.setEdit.bind(this)
    this.onTaskChange = this.onTaskChange.bind(this)

    this.state = {isEdit: false}
  }

  setEdit(isEdit) {
    this.setState({ isEdit })
  }

  onTaskChange(value) {
    text = value;
  }
  

  render() {
    const { onClick, onDelete, onEdit, completed, text } = this.props
    const { isEdit } = this.state
    let input = {text} 

    return !isEdit ? 
    <li>
      <div className="task-line">
        <div
          onClick={onClick}
          style={{
            textDecoration: completed ? 'line-through' : 'none',
          }}> 
          {text} 
        </div> 
        <div className="task-actions"> 
          <FontAwesomeIcon icon={faEdit} onClick={() => this.setEdit(true)} />
          <FontAwesomeIcon icon={faTimes} onClick={onDelete} />
        </div> 
      </div>
    </li> :
    <li> 
      <div className="task-line">
        <form onSubmit={(e) => {
          e.preventDefault()
          const value = (name) =>
          e.target.querySelector(`[name=${name}]`).value
          
          onEdit(input.value)
          this.setEdit(false)
        }}>
          <input defaultValue={text} name='text' ref={ node => { input = node }} /> 
          <button type="submit">
            Edit Todo
          </button>
        </form> 
      </div>
    </li>
  }
};


Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;