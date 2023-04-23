## 설치할 모듈 및 라이브러리

```
$ yarn add koa
$ yarn add --dev nodemon
$ yarn add koa-router
$ yarn add koa-bodyparser
```

## 접속

```
http://localhost:4000/
```

## 구동

nodemon을 사용해 서버를 자동으로 재시작 해줄 수 있다.<br>
package.json 설정 참고,<br>
'nodemon --watch src/ src/index.js' 대신 'yarn start:dev'로 구동 가능.<br>

```
$ node src

$ yarn nodemon --watch src/ src/index.js
```

<hr>

# Koa

Node.js 환경에서 웹 서버를 구축할 때 사용하는 웹 프레임워크이다.<br>
Koa는 미들웨어 기능만 갖추고 있어 필요한 기능만 붙여 서버를 만들 수 있다.<br>
Koa 애플리케이션은 미들웨어의 배열로 구성되어 있다.<br>

## 애플리케이션에 미들웨어 함수 등록하기

```javascript
const Koa = require('koa');
const app = new Koa();
app.use('middle func');
```

### middleware func

Koa에서 사용하는 middleware func의 구조는 아래와 같다.

- ctx : Context의 줄임말, 웹 요청과 응답에 관한 정보를 지니고 있다.
- next : 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수(생략 가능), next()를 호출하지 않으면 다음 미들웨어를 처리하지 않는다.

```javascript
(ctx, next) => {};
```

next()는 Promise를 반환하는데, 다음에 처리해야할 미들웨어가 끝나면 완료된다.<br>

```javascript
app.use((ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== '1') {
    ctx.status = 401; // Unauthorized 상태 표시
    return;
  }
  next().then(() => {
    console.log('END');
  });
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

// 다음 미들웨어를 실행하지 않거나, 없으면 next를 생략해도 된다.
app.use((ctx) => {
  ctx.body = 'hello world';
});
```

또한, Koa는 async / await 를 정식으로 지원한다.<br>

```javascript
app.use(async (ctx, next) => {
    ...
  /*
  next().then(() => { console.log('END'); });
  */
  await next();
  console.log('END');
});
```

<hr>

## nodemon

서버 코드를 변경할 때마다 서버를 재시작 해야 반영이 된다.<br>
이를 nodemon을 사용해 자동화 할 수 있다.<br>

<hr>

## koa-router

Koa 자체에 라우팅 기능이 없기에 koa-router 모듈을 설치해야 한다.<br>

```javascript
const Router = require('koa-router');
const router = new Router();

router.get('path', 'middleware func');

// app instance에 router 적용
app.use(router.routes()).use(router.allowedMethods());
```

### route parameter & query

일반적으로 parameter는 처리할 작업의 카테고리를 받아오거나, 고유 ID 혹은 이름으로 특정 데이터를 조회할 때 사용한다.<br>
<br>
query는 옵션에 관련된 정보를 받아온다.<br>

```javascript
// parameter
router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params;
  ...
});


// query
router.get('/posts', (ctx) => {
  const { id } = ctx.query;
  ...
}
```

<hr>

## REST API

클라이언트가 직접적으로 DB에 접속해 데이터를 변경하면 보안 문제가 발생할 수 있다.<br>
이를 중간에서 요청에 따라 대신 처리해주는 것을 서버의 REST API라고 한다.<br>
요청 종류에 따라 다른 HTTP method를 사용하기에 종류가 다양한데 주로 사용하는 method는 아래와 같다.<br>

- GET : 데이터를 조회할 때 사용
- POST : 데이터를 등록할 때 사용 (+인증 작업에도 사용)
- DELETE : 데이터를 지울 때 사용
- PUT : 새 정보로 통쨰로 교체할 떄 사용
- PATCH : 특정 필드를 수정할 때 사용

<hr>

## 라우트 모듈화

```javascript
// src/api/index.js
const Router = require('koa-router');
const api = new Router();

api.get('/test', (ctx) => {
  ctx.body = 'test 성공';
});

module.exports = api; // 라우터를 내보낸다.

// src/index.js
const api = require('./api');
router.use('/api', api.routes()); // api 모듈의 route 적용
```

<hr>

## 컨트롤러 파일

라우트를 작성하는 과정 중 미들웨어를 등록할 때 HTTP method의 두 번째 인자에 함수를 선언해 바로 넣어줄 수 있다.<br>
하지만, 라우트 처리함수의 종류가 많고 길어지면 관리가 어렵다.<hr>

### koa-bodyparser middleware

API를 구현하기 앞서 'koa-bodyparser middleware'를 적용해야한다.<br>
그래야 HTTP method를 Request Body에 JSON 형식으로 데이터를 넣어 줄 때 파싱하여 서버에서 사용이 가능하다.<br>

src/posts/posts.ctrl.js 참고
