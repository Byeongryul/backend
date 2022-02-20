# 익스프레스 프로젝트 시작하기
npm i express

npm i nodemon

```javascript
const express = require('express')

const app = express();
// 서버가 실행될 포트를 지정해줌
// app.set(key, value)를 통해 정보를 저장할 수 있음
// app.get(key)를 통해 value를 접근할 수 있음
app.set('port', process.env.PORT || 3000);
// get 요청과 url을 통해 어떤 요청인지 알 수 있음
// 물론 post, put. patch, delete, options 등을 설정할 수 있음
app.get('/', (req, res) => {
    // 이전에 res.end나 res.write를 대체함
    res.send('Hello');
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
```
```javascript
const express = require('express')
// 경로가 추가됨
const path = require('path')

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    // res.send('Hello');
    // 새로운 파일을 바로 연결해서 출력함
    // 기존 fs를 사용한 것과 상반됨
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
```
위의 sendFile은 비동기로 돌아가는 것인가? 라는 궁금증이 생김
# 자주 사용하는 미들 웨어
요청과 응답을 넣거나 에러를 조작하는 등 모든 동작을 미들 웨어로 관리할 수 있음

app.use(미들웨어) 꼴로 사용하면 됨
```javascript
const express = require('express')
const path = require('path')

const app = express();
app.set('port', process.env.PORT || 3000);
// 앞에 url이 없는 경우 모든 경우에서 미들웨어가 실행됨
app.use((req, res, next) => {
    console.log('요청 완료');
    next();
})
// 미들웨어가 동시에 선언 될 수 있음
// 단 앞에 있는 미들웨어가 next를 보내야함
app.get('/', (req, res, next) => {
    // res.send('Hello');
    res.sendFile(path.join(__dirname, '/index.html'))
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로!')
});
// 에러를 발생시키면 에러로 이동하여야 하며
// 무조건 변수가 4개여야함
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message)
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
```
npm i morgan cookie-parser express-session dotenv

위 모듈을 사용한 코드를 작성하자!
```javascript
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie'
}))
app.use((req, res, next) => {
    console.log('요청 완료');
    next();
})

app.get('/', (req, res, next) => {
    // res.send('Hello');
    res.sendFile(path.join(__dirname, '/index.html'))
    next();
}, (req, res) => {
    // throw new Error('에러는 에러 처리 미들웨어로!')
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message)
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
```
## morgan
log를 찍어서 화면에 출력해줌
```javascript
const morgan = require('morgan')
app.use(morgan('dev'));
```
## static
정적인 파일을 제공하는 라우터 역할
```javascript
const express = require('express')
app.use('/', express.static(path.join(__dirname, 'public')))
```
상대경로가 public/test -> localhost:3000/test 로 연결됨
- 존재하지 않으면 next를 함
## body-parser
요청 본문의 body 를 객체로 해석하는 것!
- 단, 멀티파트(이미지, 동영상, 파일)은 건들 수 없음
```javascript
const express = require('express')
app.use(express.json());
// querystring 사용 true 면 다른 extend 설치해서 해야함 qs
app.use(express.urlencoded({extended:false}))
```
외부에 body-parser를 불러와서 사용할 수 있는데 raw와 text도 읽을 수 있게 됨
## cookie-parser
쿠키를 해석해서 req.cookies 객체로 만들어줌
```javascript
app.use(cookieParser(비밀키));
```
쿠키를 만들어주는 작업은 하지 않음
```javascript
res.cookie('name', 'check', {
    expires:new Date(Date.now()+900000),
    httpOnly:true,
    secure:true,
    signed:true,
});
// 쿠키는 모든 내용이 겹쳐야 지울 수 있음
res.clearCookie('name','check', {httpOnly:true, secure:true, signed:true});
```
## express-session
세션 관리용 미들웨어
- 로그인 등 이유로 세션을 구현하거나 특정 사용자를 위해 데이터를 임시적으로 저장하기 위해 사용함
- cookie-parser 보다 뒤에!(낮은 버전은 필수, 높은 버전은 권장)
```javascript
app.use(session({
    // 수정이 없어도 다시 세션을 저장할 것인가?
    resave:false,
    // 저장할 내역이 없어도 세션을 생성할 것인가?
    saveUninitialized: false,
    // 비밀키
    secret: process.env.COOKIE_SECRET,
    // 쿠키
    cookie: {
        httpOnly: true,
        secure: false,
    },
    // 기본 이름은 connect.sid
    name: 'session-cookie'
    // store 옵션도 있음 == DB 연결
}))
// 세션 등록
req.session.name='check'
// 세션 아이디 가져오기
req.sessionID
// 세션 전체 삭제
req.session.destroy()
```
## 미들 웨어의 특성 활용하기
1. 미들웨어는 기본적으로 3개의 인수를 받는다
    - err 는 예외!(4개)
2. 다양한 미들웨어 요청이 존재한다
    - use, get, put 등등
3. send를 사용하면 미들웨어가 분기가 되며 종료된다!
    - 그래서 페이지를 보여주면 종료됨(http 와 다름)
4. next 안에 인수를 넣을 수 있다!
    - 라우터를 넣으면 라우터로 이동한다! 그 외는 에러로 인식한다!
    > 라우터로 공간을 불리해서 넣을 수 있다는 건 ok
    > - 에러 미들웨어가 작동될 때 정확하게 어느 에러 미들웨어로 날라가는가?
5. 미들웨어간 데이터를 전달하는 방법이 존재한다!
    - 세션은 종료될 때 까지 남아 있기 때문에 불필요한 메모리 누수가 발생될 수 있음
    - 요청 동안만 작동하고 싶으면 req에 담아서 사용한다!
    > req.set은??
    > - 그것은 모든 유저들이 접근할 수 있는 정d보가 된다.
    > - 하지만 복수의 유저 정보를 모든 세션에 저장하는 것은 비효율적임!!
6. 미들웨어 안에 미들웨어를 넣을 수 있는 것은 어떤 장점이 있는가?
    - 원할 떄 미들웨어의 분기를 처리하여 필요한 경우에만 미들웨어를 경유하게 할 수 있음
## multer
이미지, 동영상 등 멀티 파트 데이터를 업로드할 때 사용하는 미들웨어
```javascript
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie'
}))
// multer 사용함
const multer = require('multer')
const fs = require('fs');

try{
    // 파일이 있는가?
    fs.readdirSync('uploads');
} catch (err){
    // 파일이 없으면 생성함
    console.error('uploads 폴더를 생성해야함');
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        // 어디에
        destination(req, file, done){
            done(null, 'uploads/')
        },
        // 무슨 이름으로
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    // 최대 용량은 5MB
    limits: {fileSize:5*2**20},
});

// html 파일 올림
app.get('/upload', (req,res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

// 파일이 한개
app.post('/upload/single', upload.single('img1'), (req, res) => {
    console.log(req.file, req.body);
    res.send('ok')
})

// 파일이 복수 개
app.post('/upload/muti', upload.array('many'), (req, res) => {
    console.log(req.files, req.body);
    res.send('ok')
})

// field에 따라 파일 저장
app.post('/upload/field',
    upload.fields([{name:'img1'}, {name:'img2'}]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    }
)

// 파일이 없음
app.post('/upload/none', upload.none(), (req,res) => {
    console.log(req.body);
})

app.use((req, res, next) => {
    res.clearCookie('key', 'val', {signed:true})
    res.cookie('key', 'val', {
        signed:true,
    })

    console.log('요청 완료');
    next();
})

app.get('/', (req, res, next) => {
    // res.send('Hello');
    res.sendFile(path.join(__dirname, '/index.html'))
    next();
}, (req, res) => {
    // throw new Error('에러는 에러 처리 미들웨어로!')
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message)
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
```
파일을 어디에 무슨 이름으로 저장할 것인지, 최대 용량은 몇인지 지정할 수 있음
- 파일의 단수, 복수, 이름이 정해졌는지, 없는지에 따라 다른 메서드를 실행함
# Router 객체로 라우팅 분리하기
요청 메서드와 주소별 분기 처리에 의해 코드가 복잡해 졌음
분기하고 if 문이 점쳘되어 읽기도 힘이듬
- 효과적으로 나누기 위해 router를 사용할 수 있음

```javascript
// routes/index.js
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello')
})

module.exports = router;
```
```javascript
//app.js
const indexRouter = require('./routes');
app.use('/', indexRouter);
```
모듈을 나눠서 관리함으로 코드에 복잡도가 줄어듬
```javascript
const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    req.index = {};
    req.index.text = '1';
    console.log('다음으로 넘김');
    next('route'); // 이후에 있는 요소를 넘김
}, (req, res, next) => {
    req.index.text += '2';
    console.log("실행 불가");
    next();
}, (req, res, next) => {
    req.index.text += '3';
    console.log("실행 불가");
    next();
})
router.get('/', (req, res) => {
    res.send(req.index.text)
})

module.exports = router;
```
라우터의 맨 뒤에 매개변수 형태로 값을 추가하여 코드를 다양하게 짤 수 있음
- 단 뒤에 나오는 형태는 책임지지 않음(순서 주의)
- route를 통해 get과 set을 한 코드에 작성할 수 있음

```javascript
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('user');
});

router.route('/get_post')
  .get((req, res) => {
    res.send('get');
  })
  .post((req, res) => {
    res.send('post');
  });

router.get('/:id', (req, res) => {
  console.log(req.params, req.query);
  res.send([req.params, req.query]);
});

router.get('/now', (req, res) => {
  res.send('now');
});
module.exports = router;
```
# req, res 객체 살펴보기
기존 http 모듈에서 사용하던 기능을 그대로 사용할 수 있지만, express에서 추가된 모듈이 사용하기 편리함
***
- req의 추가 모듈
- req.app : req객체로 app 접근 즉, req.app.get('port') 가능
- req.body : body-parser의 결과를 확인
- req.cookies : cookies-parser의 결과를 확인
- req.ip : 요청한 ip 주소 확인
- req.params : 라우트 매개변수 확인
- req.query : 쿼리스트링에 대한 정보가 담겨있음
- req.singedCookies : 서명된 쿠키의 경우 이 곳에 보관됨
- req.get(해더 이름) : 헤더의 값을 가져오고 싶을 때
***
- res의 추가 모듈
- res.app : req와 동일함
- res.cookie(키, 값, 옵션) : 쿠키 설정
- res.clearCookie(키, 값, 옵션) : 쿠키 제거
- res.end() : 데이터 없이 응답을 보냄
- res.json(JSON) : JSON 형태로 응답
- res.redirect(주소) : 리다이렉트할 주소와 함께 응답
- res.render(뷰, 데이터) : 템플릿 엔진을 렌더링하는 메서드
- res.send(데이터) : 문자열, html, 버퍼, 객체, 배열 등 반환 가능
- res.sendFile(경로) : 경로에 위치한 파일로 응답함
- res.set(헤더, 값) : 헤더 설정
- res.status(코드) : 응답 시의 HTTP 상태 코드 지정
***
req, res는 메서드 체이닝을 지원하기에 코드량을 줄일 수 있음
***
이 밑으로 프론트 관련 내용임으로 생략
# 탬플릿 엔진 사용하기
## 퍼그
## 넌적스
## 에러 처리 미들웨어
