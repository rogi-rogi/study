import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

// 기존에 만든 리듀서들을 하나로 합쳐주기 위해 루트 리듀서를 만들었다.

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
/*
파일 이름을 index.js로 했기 때문에 외부에서 호출할 때 디렉터리 이름까지만 입력해도 불러올 수 있다.

ex) 
import rootReducer from './modules';
*/
