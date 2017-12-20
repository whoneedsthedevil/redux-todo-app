import React, {Component} from 'react'
import PropTypes from 'prop-types'

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
      <div>
        <div
          onClick={onClick}
          style={{
            textDecoration: completed ? 'line-through' : 'none',
          }}> 
          {text} 
        </div> 
        <div onClick={onDelete}> [delete] </div>
        <div onClick={() => this.setEdit(true)}> [edit] </div>
      </div>
    </li> :
    <li> 
      <form onSubmit={(e) => {
        e.preventDefault()
        const value = (name) =>
        e.target.querySelector(`[name=${name}]`).value
        console.log(value('text'))
        onEdit(input.value)
        this.setEdit(false)
      }}>
        <input defaultValue={text} name='text' ref={ node => { input = node }} /> 
        <button type="submit">
          Edit Todo
        </button>
      </form> 
    </li>
  }
};


Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;