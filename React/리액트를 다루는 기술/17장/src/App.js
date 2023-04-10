import Counter from './components/Counter';
import Todos from './components/Todos';
import CounterContainer from './container/CounterContainer';
import TodosContainer from './container/TodosContainer';

const App = () => {
  return (
    <div>
      {/* <Counter number={0} /> */}
      <CounterContainer />
      <hr />
      {/* <Todos /> */}
      <TodosContainer />
    </div>
  );
};
export default App;
