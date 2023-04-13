import { createAction, handleActions } from 'redux-actions';

// action name, 'path/action_name'
const PATH = 'counter';
const INCREASE = PATH + '/INCREASE';
const DECREASE = PATH + '/DECREASE';

// redux-actions lib의 createAction을 사용한 action creator 만들기
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
  number: 0,
};

// redux-actions lib의 handleActions을 이용해 reducer 만들기
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);
export default counter;

/*
// action creator
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 
function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return { number: state.number + 1 };
    case DECREASE:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
*/
