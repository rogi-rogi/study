import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

// action name
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

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

/*
function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return { ...state, input: action.input };
    case INSERT:
      return { ...state, todos: state.todos.concat(action.todo) };
    case TOGGLE:
      return { ...state,
        todo: state.todos.map((todo) => todo.id === action.id ? { ...todo, done: !todo.done } : todo)
      };
    case REMOVE:
      return { ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}
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
