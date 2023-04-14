### 설치할 라이브러리
```
$ yarn add redux react-redux
$ yarn add redux redux-actions
$ yarn add immer
```
### 접속
```
http://localhost:3000
```
<br>
<br>

#시작
React에서 redux를 사용할 때는 store 내장 함수(dispatch, subscribe 등)를 직접 사용하지 않고,<br>
react-redux lib에서 제공하는 유틸함수(connect)와 컴포넌트(Provider)를 사용한다.

# redux pattern
```mermaid
    graph TB
        subgraph default pattern
            container -->|action dispatch| redux-store
            redux-store -->|send state| container
            container -->|props| presentation
        end
```
## structure
가장 기본 방식으로는 actions, constants, reducers 으로 나누어서 사용하는 방식이 있다.
하지만, 새로운 액션을 만들 때 마다 3개의 디렉토리에 있는 파일을 전부 수정해줘야 한다.

modules이라는 디렉터리 내부에 action type, action creator, reducer func를 하나로 몰아 작성한 파일을 저장하는 방식.
Ducks pettern이라고도 불린다.

<hr>

## root reducer
modules 폴더에서 여러 reducer를 다루어야 하기에 루트 리듀서를 만들어 줘야 한다.

```javascript
  // src/modules/index.js
  
  import { combineReducers } from 'redux';
  import counter from './counter';
  import todos from './todos';
  
  const rootReducer = combineReducers({ counter, todos });
  export default rootReducer;
```

파일 이름이 index.js이기 떄문에 외부에서 사용할 떄는 디렉터리 이름만 입력해도 된다.
```javascript
  import rootReducer from './modules';
```

<hr>

## store & Provider
```javascript
  // src/index.js
  ...
  import { createStore } from 'redux';
  import { Provider } from 'react-redux'
  
  const store = createStore(rootReducer); 
  ...
  
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
```

<hr>

## store와 연동하기
```javascript
  // src/container/CounterContainer.js
  import { connect } from 'react-redux';
  ...
  /*
  connect(mapStateToProps, mapDispatchToProps)(연동한 컨테이너 컴포넌트)
  connect함수는 컨테이너 컴포넌트를 인자로 받는 함수를 반환한다.
  
  mapStateToProps
  : 리덕스 스토어 안의 상태를 컨테이너 컴포넌트의 props로 넘겨주기 위해 설정하는 함수

  mapDispatchToProps
  : 액션 생성 함수를 컨테이너 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
  */
  ...
  export default connect( (state) => (
    { number: state.counter.number }), 
    /*
    (1)
    (dispatch) => ({
      increase: () => dispatch(increase()),
      decrease: () => dispatch(decrease()),
    })
    
    (2) import { bindActionCreators } from 'redux';
    (dispatch) => bindActionCreators({ increase, decrease }, dispatch)
    */
    // mapDispatchToProps를 객체 형태로 넣어주면 connect 내부에서 bindActionCreators 작업을 대신해준다.
    { increase, decrease }
  )(CounterContainer);
```

<hr>

## redux-action 사용해 손쉽게 action creator & reducer 만들기
```javascript
    // src/modules/todos.js
    import { createAction, handleActions } from 'redux-actions';
    
    // export const changeInput = (input) => ({ type: CHANGE_INPUT, input });
    export const changeInput = createAction(CHANGE_INPUT, (input) => input);
    /*
    createAction을 사용할 경우 추가데이터는 payload라는 프로퍼티 명으로 접근해야 한다.
    때문에, createAction의 두 번째 인자에 payload에 대해 정의를 해주어야 한다.
    */
    
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
    const todos = handleActions({
      // default
      [CHANGE_INPUT] : ( state, action ) => ( {...state, action.payload} ),
      // 객체 비구조화 할당으로 payload명 재정의
      [INSERT] : ( state, {payload : todo} ) => ( {...state, todos:state.todos.concat(todo)} ),
      // immer을 사용해 복잡한 구조를 가진 객체의 불변성 유지
      [TOGGLE] : ( state, {payload : id} ) => produce( state, draft => {
        const todo = draft.todos.find(todo => todo.id === id);
        todo.done = !todo.done;
      } ),
      ...
      
    }, initialState );
```
<hr>

# Hooks를 사용하여 컨테이너 컴포넌트 만들기

## useSelector & useDispatch

```javascript
    const CounterContainer = () => {
      // state
      const number = useSelector((state) => state.counter.number);

      // action
      const dispatch = useDispatch();
      const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
      const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
      return (
        <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
      );
    };
    export default CounterContainer;

    /*
    const CounterContainer = ({ number, increase, decrease }) => {
      return (
        <Counter number={number} onIncrease={increase} onDecrease={decrease} />
      );
    };

    export default connect((state) => ({ number: state.counter.number }), {
      increase,
      decrease,
    })(CounterContainer);
    */
```
<br>

## connect vs Hooks
더 편한 것을 사용하자!
단, connect를 사용해 컨테이너 컴포넌트를 만들 경우 부모 컴포넌트가 리렌더링될 때,
해당 컨테이너 컴포넌트의 props가 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능이 최적화된다.

하지만 Hooks는 이러한 최적화 작업이 자동으로 이루어 지지 않으니 React.memo를 컨테이너 컴포넌트에 사용해 주어야 한다.

