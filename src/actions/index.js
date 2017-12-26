import { v4 } from 'node-uuid';


export const addTodo = (text, points) => ({
    type: 'ADD_TODO',
    id: v4(),
    text,
    points
});

export const editTodo = (id, text) => ({
    type: 'EDIT_TODO',
    id,
    text
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id,
});

export const deleteTodo = (id) => ({
    type: 'DELETE_TODO',
    id,
});

export const loadTags = (id) => ({
    type: 'LOAD_TAGS',
    id,
});

export const loadTagsSuccess = (taskRequest) => ({
    type: 'LOAD_TAGS_SUCCESS',
    taskRequest,
});