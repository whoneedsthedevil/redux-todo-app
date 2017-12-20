import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewTodo from './ViewTodo'

export default class Row extends Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.setEdit = this.setEdit.bind(this)
    this.state = { isEdit: true }
  }

  setEdit(isEdit) {
    this.setState({ isEdit })
  }

  render() {
    const {onClick, onDelete, onEditFlag, id, text, completed} = this.props;
    <ViewTodo {...{...this.props}} />
  }
}

