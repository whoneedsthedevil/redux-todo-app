
const sagaRequests = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TAGS_SUCCESS':
      console.log('%c Current task is:', 'color: DarkOrange', action.taskRequest[action.taskRequest.length - 1]);

      return { ...state, task: action.taskRequest };

    default:
      return state;
  }
};

export default sagaRequests;