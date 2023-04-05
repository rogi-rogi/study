/*
==========[action]==========
상태에 어떠한 변화가 필요하면 action 이 발생, actions은 하나의 객체로 표현한다.
{ type : 'type name', ...state }, action object는 반드시 type 필드를 가져야 한다.

==========[action creator]==========
액션 생성 함수(action creator)은 액션 객체를 만들어 반환하는 함수.

function addTodo(data) {
  return {
    type : 'ADD_TODO',
    data
  };
}


==========[reduer]==========
리듀서는 변화를 일으키는 함수. 현재 상태와 전달받은 액션 객체를 매개변수로 가진다.
두 매개변수를 참고해, 새로운 상태를 만들어 반환.

const initialState = {
  counter : 1
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT :
      return { counter:state.counter + 1 };
    defaultL
      return state;
  }
}

==========[store]==========
프로젝트에 리덕스를 적용하기 위해 스토어를 만들어야함(하나의 프로젝트에는 하나의 스토어)
스토어 안에는 현재 상태와, 리듀서, 내장 함수(dispatch, subscribe 등)가 있다.

==========[dispatch]==========
액션을 발생시키는 것.
이 함수가 호출되면 스토어는 리듀서 함수를 실행해 새로운 상태를 만들어준다.

1. dispatch(action object) 호출
2. 스토어가 리듀서 함수 실행.
3. 스토어에 의해 실행된 리듀서가 새로운 상태를 만들어 반환.

==========[subscribe]==========
1. store.subscribe(listener function) 호출
2. dispatch(action object)가 호출되어 상태가 업데이트 될 때마다
   listener function 호출
3. 구독을 비활성화 할때는 아래처럼 구독 활성화 당시 생성한 subscribe함수를 실행하면된다.

const unsubscribe = store.subscribe(listerner function);// 구독 활성화
unsubscribe() // 구독 비활성화

*/

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
