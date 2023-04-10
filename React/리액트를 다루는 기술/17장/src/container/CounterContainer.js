import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, increase } from '../modules/counter';
import { bindActionCreators } from 'redux';

/*

해당 컴포넌트를 리덕스와 연동하려면 react-redux에서 제공하는 connect함수를 사용.
connect(mapStateToProps, mapDispatchToProps)(연동한 컨테이너 컴포넌트)

mapStateToProps
: 리덕스 스토어 안의 상태를 컨테이너 컴포넌트의 props로 넘겨주기 위해 설정하는 함수

mapDispatchToProps
: 액션 생성 함수를 컨테이너 컴포넌트의 props로 넘겨주기 위해 사용하는 함수

connect함수는 컨테이너 컴포넌트를 인자로 받는 함수를 반환
-> 컨테이너 컴포넌트와 리덕스가 연동된다.
const makeContainer = connect(mapStateToProps, mapDispatchToProps)
makeContainer(연동할 컨테이너 컴포넌트);

*/

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });
// const mapDispatchToProps = (dispatch) => ({
//   increase: () => {
//     dispatch(increase());
//   },
//   decrease: () => {
//     dispatch(decrease(0));
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
// 깔끔하게 작성하기. 익명함수로 선언해도 큰 문제가 없다.
export default connect(
  // mapStateToProps
  (state) => ({ number: state.counter.number }),

  // mapDispatchToProps
  // (1) 기본 작성 방법
  //   (dispatch) => ({
  //     increase: () => dispatch(increase()),
  //     decrease: () => dispatch(decrease()),
  //   }),

  /*
    (2)
    dispatch의 action creator을 호출하는 코드를 dispatch로 감싸야 하는 부분이 번거로울 수 있다.
    이를 간결하게 bindActionCreators을 사용해 해결할 수 있다.
  */
  //   (dispatch) => bindActionCreators({ increase, decrease }, dispatch),

  /*
  (3) mapDispatchToProps의 전달 인자를 함수형태가 아닌 객체 형태로 넣어주는 방법
    connect 함수가 내부적으로 bindActionCreators 작업을 대신해준다.
  */
  { increase, decrease },
)(CounterContainer);
