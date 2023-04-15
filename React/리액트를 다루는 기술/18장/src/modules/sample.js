import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { startLoading, finishLoading } from "./loading";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";
import createRequestSaga from "../lib/createRequestSaga";

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

//====================================================================[action creator start]
// thunk = action creator (func)
/*
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
*/
/*
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST }); // 요청 시작을 알림
  try {
    const response = await api.getPost(id);
    dispatch({ type: GET_POST_SUCCESS, payload: response.data }); // 요청 성공
  } catch (e) {
    // 요청 실패
    dispatch( { type: GET_POST_FAILURE, payload: e, error: true } );
    throw e; // 추후 컴포넌트단에서 에러를 조회할 수 있게 해 줌
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS });
  try {
    const response = await api.getUsers();
    dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch( { type: GET_USERS_FAILURE, payload: e, error: true } );
    throw e;
  }
};
*/

// saga
export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);
/*
function* getPostSaga(action) {
  yield put(startLoading(GET_POST));
  try {
    const post = yield call(api.getPost, action.payload);
    yield put({ type: GET_POST_SUCCESS, payload: post.data });
  } catch (e) {
    yield put({ type: GET_POST_FAILURE, payload: e, error: true });
  }
  yield put(finishLoading(GET_POST));
}

function* getUsersSaga(action) {
  yield put(startLoading(GET_USERS));
  try {
    const users = yield call(api.getUsers, action.payload);
    yield put({ type: GET_USERS_SUCCESS, payload: users.data });
  } catch (e) {
    yield put({ type: GET_USERS_FAILURE, payload: e, error: true });
  }
  yield put(finishLoading(GET_USERS));
}
*/

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}
//====================================================================[action creator end]

// 요청의 로딩 중 상태는 loading 객체에서 관리.
const initialState = {
  // loading: {
  //   GET_POST: false, // true : 요청시작, false : 요청 완료
  //   GET_USERS: false,
  // },
  post: null,
  users: null,
};

//====================================================================[reducer start]
// reducer
/*
const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: { ...state.loading, GET_POST: true },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_POST: false },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_POST: false },
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: { ...state.loading, GET_USERS: true },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_USERS: false },
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_USERS: false },
    }),
  },
  initialState
);
*/

/*
reducer에서 actiondl dispatch될 때 마다 loading에 대한 상태 관리도 해주었지만,
moduels/loading.js에서 loading 상태만 관리해주는 모듈을 생성해, reducer에서는 loading 상태 관여 xx
 */
const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

//====================================================================[reducer end]
export default sample;
