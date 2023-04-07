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
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = {
  number: 0,
};

// reducer
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

export default counter;
