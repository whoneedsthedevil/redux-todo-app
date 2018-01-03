import { take, put, call, fork, race } from 'redux-saga/effects';
import * as actions from '../actions';

export function* getTask(action) {
  try {
    const taskRequest = yield fetch(`http://localhost:3004/tasks/`, {
    		method: "GET"
	    })
	    .then(response => {
	      return response.json();
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
          points: action.points,
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

    yield put({ type: 'ADD_TODO_SUCCESS', taskRequest })
  } 
  catch(err) {
    yield put({ type: 'ADD_TODO_FAILED', err })
  }
}


export function* watchRequest() {
  try {
    while(true) {
  		
      const loadTags = yield take('ADD_TODO_SUCCESS')

      yield race([
        call(getTask, loadTags),
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
      
      const postTag = yield take('ADD_TODO')

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