import { createStore } from "redux";

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

//action name
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

//action creator
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
  toggle: false,
  counter: 0
};

// reducer : 변화를 일으키는 함수, 새로운 상태를 만들어서 반환
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        // 새로운 state를 반환해 얕은 탐색의 이점을 이용함.
        ...state, // 불변성 유지
        toggle: !state.toggle
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}

// store : 프로젝트에 reducer을 적용하는 기능
const store = createStore(reducer);

const render = () => {
  const state = store.getState();
  if (state.toggle) divToggle.classList.add("active");
  else divToggle.classList.remove("active");
  counter.innerText = state.counter;
};
render();

//store의 상태가 변할때마다 render호출하기
//리액트 프로젝트에서 리덕스를 사용할 때는 react-redux가 자동으로 해준다.
store.subscribe(render);

// dispatch : 액션을 발생시킨다.

divToggle.addEventListener("click", () => store.dispatch(toggleSwitch()));
btnIncrease.addEventListener("click", () => store.dispatch(increase(1)));
btnDecrease.addEventListener("click", () => store.dispatch(decrease()));
