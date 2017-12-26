const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        points: action.points,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };
    case 'EDIT_TODO':
      if (state.id === action.id) {
        state.text = action.text;
        return state;
      }
    case 'DELETE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      
    default:
      return state;
  }
};

export default todo;