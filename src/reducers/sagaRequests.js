
const sagaRequests = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TAGS_SUCCESS':
      console.log('%c Current task is:', 'color: DarkOrange', action.taskRequest.text);

      return { ...state, task: action.taskRequest.text };

    default:
      return state;
  }
};

export default sagaRequests;