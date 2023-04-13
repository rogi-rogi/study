import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

// action name
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

/*
// action creator

export const changeInput = (input) => ({ type: CHANGE_INPUT, input });
let id = 3;
export const insert = (text) => ({ type: INSERT, todo: { id: ++id, text, done: false } });
export const toggle = (id) => ({ type: TOGGLE, id });
export const remove = (id) => ({ type: REMOVE, id });
*/

/*
 createAction으로 action creator 만들기
 createAction으로 만든 action creator의 추가 데이터는 'payload'라는 프로퍼티 명으로 접근할 수 있다.
 createAction 두 번쨰 함수에 payload를 정의하는 함수를 선언해서 넣으면, 추후 payload라는 프로퍼티명으로 사전에 정의한 요소로 대체 가능
*/
export const changeInput = createAction(CHANGE_INPUT, (input) => input);
let id = 3;
export const insert = createAction(INSERT, (text) => ({
  id: ++id,
  text,
  done: false,
}));
export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

// reducer
const initialState = {
  input: '',
  todos: [
    { id: 1, text: '리덕스 기초 배우기', done: true },
    { id: 2, text: '리엑트와 리덕스 사용하기', done: false },
  ],
};

// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return { ...state, input: action.input };
//     case INSERT:
//       return { ...state, todos: state.todos.concat(action.todo) };
//     case TOGGLE:
//       return {
//         ...state,
//         todo: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo,
//         ),
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }

/*
모든 추가 데이터를 action.payload라는 이름으로 사용하기 때문에 명확성이 떨어질 수 있음
객체 비구조화 할당 문법으로 action의 payload 이름을 새로 설정할 수 있다.

*/
const todos = handleActions(
  {
    // action.payload의 새로운 이름 input
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
    // immer produce를 사용해 복잡한 구조를 가진 객체의 불변성 유지하기
    [INSERT]: (state, action) =>
      produce(state, (draft) => {
        draft.todos.push(action.payload);
        // todos: state.todos.concat(action.payload),
      }),
    [TOGGLE]: (state, action) => ({
      ...state,
      todo: state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, deon: !todo.done } : todo,
      ),
    }),
    [REMOVE]: (state, action) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.payload),
    }),
  },
  initialState,
);

export default todos;
