

## action
상태에 어떠한 변화가 필요하면 action 이 발생, actions은 하나의 객체로 표현한다.
{ type : 'type name', ...state }, action object는 반드시 type 필드를 가져야 한다.

## action_creator
액션 생성 함수(action creator)은 액션 객체를 만들어 반환하는 함수.

function addTodo(data) { return { type : 'ADD_TODO', data }; }

## reducer
리듀서는 변화를 일으키는 함수. 현재 상태와 전달받은 액션 객체를 매개변수로 가진다.
두 매개변수를 참고해, 새로운 상태를 만들어 반환.(불변성 유지)

const initialState = { counter : 1 };

function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT :
            return { counter:state.counter + 1 };
        default :
            return state;
    }
}

## store
프로젝트에 리덕스를 적용하기 위해 스토어를 만들어야함(하나의 프로젝트에는 하나의 스토어)
스토어 안에는 현재 상태와, 리듀서, 내장 함수(dispatch, subscribe 등)가 있다.

## dispatch
액션을 발생시키는 것.
이 함수가 호출되면 스토어는 리듀서 함수를 실행해 새로운 상태를 만들어준다.

1. dispatch(action object) 호출
2. 스토어가 리듀서 함수 실행.
3. 스토어에 의해 실행된 리듀서가 새로운 상태를 만들어 반환.

## subscribe

1. store.subscribe(listener function) 호출
2. dispatch(action object)가 호출되어 상태가 업데이트 될 때마다(dispatch -> reducer -> update state)
   listener function 호출
3. 구독을 비활성화 할때는 아래처럼 구독 활성화 당시 생성한 subscribe함수를 실행하면된다.

const unsubscribe = store.subscribe(listerner function);// 구독 활성화
unsubscribe() // 구독 비활성화
