import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;

  if (!console.group) {
    return rawDispatch
  }
  return (action) => {
    console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
		console.log('%c action', 'color: blue', action);
		const returnValue = rawDispatch(action);
		console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

const configureStore = () => {

	const persistedState = loadState();

  const sagaMiddleware = createSagaMiddleware();
	const store = createStore(todoApp, persistedState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

    if (process.env.NODE_ENV !== 'production') {
      store.dispatch = addLoggingToDispatch(store);
    }

	store.subscribe(throttle(() => {
		saveState({
			todos: store.getState().todos, 
      sagaData: store.getState().sagaData
		});
	}, 1000));

	return store;
}


export default configureStore;