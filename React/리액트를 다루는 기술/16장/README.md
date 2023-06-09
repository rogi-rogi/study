## Webpack 대신 Parcel 사용

### 설치 및 실행
```
$ yarn global add parcel-bundler
$ parcel index.html
```
### 접속
```
http://localhost:1234
```
<br>
<br>

# redux

```mermaid
    graph TB
        redux-lib --- STORE
        subgraph STORE
            state -.-> reducer
            action -.-> dispatch
            action -.-> reducer
            dispatch -->|call| reducer
            reducer -->|update| new_state
            unsubscribe -->|call| subscribe
            listener-func -.-> subscribe
            subscribe -.-> |detect|id1{update}
            id1{update} -.->|call| listener-func
        end
```

## action
상태에 어떠한 변화가 필요하면 action 이 발생, actions은 하나의 객체로 표현한다.<br>
```javascript
{ type : 'type name', ...state } // action object는 반드시 type 필드를 가져야 한다.
```
<br>

## action creator
액션 생성 함수(action creator)은 액션 객체를 만들어 반환하는 함수.

```javascript
function addTodo(data) { return { type : 'ADD_TODO', data }; }
```
<br>

## reducer
리듀서는 변화를 일으키는 함수. 현재 상태와 전달받은 액션 객체를 매개변수로 가진다.<br>
두 매개변수를 참고해, 새로운 상태를 만들어 반환.(불변성 유지)<br>

```javascript
const initialState = { counter : 1 };

function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT :
            return { counter:state.counter + 1 };
        default :
            return state;
    }
}
```
<br>

## store
프로젝트에 리덕스를 적용하기 위해 스토어를 만들어야함(하나의 프로젝트에는 하나의 스토어)<br>
스토어 안에는 현재 상태와, 리듀서, 내장 함수(dispatch, subscribe 등)가 있다.<br>
<br>

## dispatch
액션을 발생시키는 주체. <br>
이 함수가 호출되면 스토어는 리듀서 함수를 실행해 새로운 상태를 만들어준다.<br>

1. dispatch(action object) 호출
2. 스토어가 리듀서 함수 실행.
3. 스토어에 의해 실행된 리듀서가 새로운 상태를 만들어 반환.
<br>

## subscribe
1. store.subscribe(listener function) 호출
2. dispatch(action object)가 호출되어 상태가 업데이트 될 때마다(dispatch -> reducer -> update state)
   listener function 호출
3. 구독을 비활성화 할때는 아래처럼 구독 활성화 당시 생성한 subscribe함수를 실행하면된다.
<br>

```javascript
const unsubscribe = store.subscribe(listerner function);// 구독 활성화
unsubscribe() // 구독 비활성화
```

## 리덕스의 세 가지 규칙
1. 단일 스토어<br>
특정 부분을 완전히 분리시킬 때 여러 개의 스토어 만드는 것은 가능. <br>
하지만, 상태 관리가 복잡해질 수 있어 권장하지 않음.<br>

3. 읽기 전용 상태<br>
상태를 업데이트 할 떄 불변성을 유지하기 위해 새로운 객체를 생성해 반환한다.<br>

5. 리듀서는 순수한 함수<br>
이전 상태와 액션 객체를 매개변수로 받는다.<br>
매개변수 외의 값에는 의존하지 않는다.<br>
이전 상태는 참조만하며, 새로운 상태 객체를 만들어 반환<br>
동일한 매개변수로 호출 된 리듀서 함수는 항상 동일한 값을 반환해야한다.
