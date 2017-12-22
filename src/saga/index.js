import { take, put, call, fork, race } from 'redux-saga/effects';
import * as actions from '../actions';

export function* consoleTask(action) {
  try {
    const taskRequest = yield fetch(`http://localhost:3004/tasks/${action.id}`, {
    		method: "GET"
	    })
	    .then(response => {
	      return response.json()
	        .then(({ id, text, completed }) =>  ({ id, text, completed }));
	    })
	    .catch(error => {
	      throw error;
	    });

    yield put({ type: 'LOAD_TAGS_SUCCESS', taskRequest })
  } 
  catch(err) {
    yield put({ type: 'LOAD_TAGS_FAILED', err })
  }
}

export function* watchRequest() {
  try {
    while(true) {
  		
      const action = yield take('LOAD_TAGS')
      yield race([
        call(consoleTask, action),
        take('CANCEL_LOADING')
      ])
  	}
  } finally {
    console.log('watch terminated')
  }
}

export default function* rootSaga() {
  yield fork(watchRequest)
}