import { createAction, handleAction } from 'redux-actions';

// action name, 'path/action_name'
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/*
 action creator
 
 export 로는 여러 개를 내보낼 수 있다.
 export a, b;
 >>> import {a, b} from ~~~

 export default c;
 >>> import c from ~~~
*/

// action creator 기본 방식
/*
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
*/

// redux-actions lib의 createAction을 사용한 방식
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
  number: 0,
};

// reducer 기본방식
/*
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
// redux-actions lib의 handleActions을 이용해 reducer 만들기

const counter = handleAction(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);
export default counter;
