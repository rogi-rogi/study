## 책 외의 참고처
https://velog.io/@velopert/learn-remix

## 설치할 라이브러리

```
$ yarn add axios
```

## 접속

```
http://localhost:3000
```

## 구동

```
$ yarn dev
$ npx json-server ./data.json --port 4000 -d 500
```

## 서버 사이드 렌더링

UI를 서버에서 렌더링 하는 것이다.<br>
기본적으로 렌더링은 클라이언트의 웹 브라우저에서 처리하고 있다.<br>
반면 서버 사이드 렌더링은 렌더링을 서버에게 맡겨 사용자에게 쾌적한 웹 환경을 제공한다.<br>
React는 JS가 실행되어야 UI가 사용자에게 부여진다.<br>

### 장점

1. JS가 실행되기 전에 사용자는 UI를 먼저 볼 수 있다. (대부분 사용자의 인터랙션이 시작되기 전에 JS 로딩이 끝나 정상적으로 사용 가능)
2. 검색 엔진 최적화가 가능하다. (서버 사이드 렌더링을 통해 검색 엔진이 웹 페이지를 제대로 읽어갈 수 있거나, 검색 결과 랭킹 등에 영향을 줄 수 있다.)
3. 정적 페이지 및 캐싱 (자주 변하지 않는 페이지를 서버 사이드 렌더링을 하여 캐싱하면 응답 시간을 단축 시킬 수 있다.)

### 단점

1. 서버가 대신 렌더링을 수행하기에 서버의 리소스 관리가 필요하다. (이는 서버 자동 스케일링/로드 밸런싱/캐싱/서버리스 기술 등을 통해 해결이 가능하다.)
2. React에서 자체적으로 서버 사이드 렌더링 기능이 제공되지만 실제 도입을 하기에는 상당히 복잡하다. (다행히 서버 사이드 렌더링을 간단하게 구성해주는 프레임 워크들이 있다. Next.js / Remix 등, Remix는 React Router 개발사에서 제공하기에 호환이 잘 된다는 장점이 있다.)

<hr>

# Remix 시작하기

```
$ npx create-remid 'folder name'

? What type of app do you want to create?
>>> Just the basics
? Where do you want to deploy? Choose Remix if you're unsure; it's easy to
change deployment targets.
>>> Remix App Server

? TypeScript or JavaScript?
>>> JavaScript
? Do you want me to run `npm install`?
>>> No

$ cd 'folder name'
$ yarn
$ yarn dev
```

<br>

## 디렉터리 기반 라우팅

react-route-dom lib를 사용할 때는 컴포넌트 선언 방식으로 사용했지만, Remix의 경우 디렉터리 구조에 기반해 라우트가 자동으로 설정된다.<br>
<br>
페이지를 이동시키는 링크를 만들 때는 react-router-dom lib와 동일하게 Link 컴포넌트를 사용한다.<br>

### Link

```javascript
import { Link } from "@remix-run/react";

<Link to="/path">link name</Link>;
```

Remix의 Link 컴포넌트를 사용해 페이지를 이동할 때는 서버 사이드 렌더링을 다시 하는 것이 아닌, 코드 스플리팅된 컴포넌트를 불러오고, 클라이언트에서 렌더링을 하게 된다.<br>
<br>
Remix를 사용하면 React.lazy를 사용하지 않아도 자동으로 Route 단위의 코드 스플리팅이 적용된다.<br>

# Outlet

Outlet 컴포넌트를 렌더링 하면, 해당 경로의 하위 라우터들이 Outlet 컴포넌트가 사용한 자리에 나타나게 된다.<br>

```javascript
// app/routes/articles.jsx

import { Link, Outlet } from '@remix-run/react';

<Outlet />

<ul>
    <li>
        <Link to="/articles/1">게시글 1</Link>
    </li>
    <li>
        <Link to="/articles/1">게시글 2</Link>
```

<hr>

## 데이터 불러오기

Route에서 데이터를 불러올 떄는 우선 데이터를 요청후 받은 데이터를 json으로 type 변경 후 내보내주어야 한다.<br>

내보낸 데이터를 useLoaderData Hook를 사용해 받아와 사용이 가능하다.

```javascript
// app/routes/users/index.jsx

import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUsers } from "../../lib/api";

export const loader = async () => {
  const data = await getUsers();
  return json(data);
};

export default function Users() {
  const users = useLoaderData();
}
```

## 데이터 쓰기

Remix에서는 Form 기반의 데이터 쓰기 방식을 권장한다.<br>

### action

route에서 데이터 쓰기를 하기 위해서는 action 함수를 만들어서 내보내 주어야 한다.<br>
action 함수는 request parameter를 통해 요청한 데이터를 Form Data 형식( request.formData() )으로 조회할 수 있다.<br>
함수 내부에서 원하는 데이터 쓰기 함수를 요청할 수 있다.<br>

```javascript
export async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const story = await createStory({ title, body });
  return story;
}

export default function Stories() {
  const stories = useLoaderData();
  const transition = useTransition();

```

### Form

action 함수를 이용하기 위해서는(데이터 쓰기를 위해서는) Remix에서 제공하는 Form 컴포넌트를 사용해야 한다.<br>
useTransition Hook는 Form의 상태를 조회할 때 사용된다.<br>
Hook의 state는 아래와 같은 상태값이 있다.<br>

- 기본 상태 :'idle'
- 데이터 쓰기 요청 중 : 'submitting'
- 데이터 쓰기 후 useLoaderData Hook의 데이터를 불러오는 중 : 'loading'

<hr>

## 데이트 쓰기 및 업데이트 과정

1. Remix의 Form 컴포넌트를 통해 등록을 하면 Remix 서버로 데이터가 전달된다.
2. 서버에서 action 함수를 호출한 결과를 브라우저에게 보낸다.
3. 응답된 데이터를 사용하고 싶으면 useActionData Hook을 사용하면 된다.
4. 이후 useLoaderData Hook을 통해 불러온 데이터가 자동으로 최신화가 된다.

<hr>

## 배포

```
$ yarn build
$ yarn start
```

### remix.config.js 설정

future객체의 v2_routeConvention 기능이 true인 경우 routes 배열을 선언해 임의 경로를 설정해 주어야 한다.
임의 경로를 설정하지 않으면, 암묵적으로 경로가 설정되는데 이 과정에서 생성한 디렉터리 구조를 올바르게 읽지 못해 404에러가 발생할 수 있다.
