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


export function* postTask(action) {
  try {

    const payload = {
          id: action.id,
          text: action.text,
          completed: false
        };

    const taskRequest = yield fetch(`http://localhost:3004/tasks`, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        return response.json();
      })
      .then(res => console.dir(res))
      .catch(error => {
        throw error;
      });

    yield put({ type: 'TAG_POSTING_SUCCESS', taskRequest })
  } 
  catch(err) {
    yield put({ type: 'TAG_POSTING_FAILED', err })
  }
}


export function* watchRequest() {
  try {
    while(true) {
  		
      const loadTags = yield take('LOAD_TAGS')

      yield race([
        call(consoleTask, loadTags),
        take('CANCEL_LOADING')
      ])
  	}
  } finally {
    console.log('watch terminated')
  }
}
export function* watchPostTodo() {
  try {
    while(true) {
      
      const postTag = yield take('POST_TAG')

      yield race([
        call(postTask, postTag),
        take('CANCEL_LOADING')
      ])
    }
  } finally {
    console.log('watch terminated')
  }
}

export default function* rootSaga() {
  yield fork(watchRequest)
  yield fork(watchPostTodo)
}