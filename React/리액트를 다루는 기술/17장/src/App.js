import Counter from './components/Counter';
import Todos from './components/Todos';
import CounterContainer from './container/CounterContainer';
import TodosContainer from './container/TodosContainer';

const App = () => {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
};
export default App;
