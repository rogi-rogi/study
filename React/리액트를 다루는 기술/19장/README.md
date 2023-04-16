## 설치할 라이브러리

```
$ yarn add @loadable/component
```

<hr>

## webpack의 역할

빌드 작업을 통해 불필요한 부분을 제거해 파일 크기를 최소화하거나,<br>
코드가 원활하게 실핼되도록 코드의 트랜스파일 작업 등의 과정을 거치고 사용자에게 제공된다.<br>
<br>
CRA의 기본 webpack 설정에는 SplitChunks라는 기능이 적용되어 node_modules에서 불러온 파일을 자동으로 분리시켜 캐싱의 효과를 누릴 수 있게 해준다.<br>
이러한 과정을 코드 스플리팅이라고 한다.<br>
<br>
만약 비동기 로딩 설정을 하지 않는다면, 당장 필요하지 않은 컴포넌트 정보들도 모두 불러오기 때문에 파일크기가 매우 커진다.<br>

<hr>

## React.lazy & Suspense component

React.lazy는 컴포넌트를 렌더링 하는 시정에서 비동기적으로 로딩할 수 있게 해 주는 유틸 함수이다.<br>
<br>
Suspense component는 react 내장 컴포넌트로, 코드 스플리팅 된 컴포넌트를 로딩하도록 실행해준다.<br>
fallback props를 통해 로딩 중에 보여 줄 JSX를 지정할 수 있다.<br>

```javascript
import { Suspense } from "react";

const SplitMe = React.lazy(() => import("./SplitMe"));
...

<Suspense fallback={<div>loading...</div>}>
  <SplitMe />
</Suspense>;
```

<hr>

## Loadable component

서버 사이드 렌더링을 지원하면서, 코드 스플리팅을 편하게 하도록 도와주는 서드파티 라이브러리 이다.<br>
React.lazy와 사용법이 비슷하지만, Susoense를 사용할 필요가 없다.<br>

```javascript
import loadable from "@loadable/component";

const SplitMe = loadable(() => import("./SplitMe"), {failback : /*로딩 중에 보여줄 JSX*/});
```

<br>

### 서버 사이드 렌더링이란?

웹 서비스의 초기 로딩 속도 개선, 캐싱 및 검색 엔진 최적화를 가능하게 해 주는 기술이다.<br>
