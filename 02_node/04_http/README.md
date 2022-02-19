# 요청과 응답 이해하기
서는 클라이언트가 있어야 작동함
- 서버로 요청(request)
- 클라이언트로 응답(response)
```javascript
const http = require('http')
// 이벤트 리스너로 만듬
http.createServer((req, res) => {
    // 여기에 응답을 적음
});
```
모듈에서 createServer를 통해 간단하게 서버를 만들 수 있음
- req, res 각각 요청과 응답을 뜻함

여기에 추가로 응답 내용을 적어보자!
```javascript
// 01_server1.js
const http = require('http')
http.createServer((req, res) => {
    // 응답에 대한 정보를 기록
    // 요청에 대한 성공 여부, 콘텐츠 형식 정보
    // 이런 부분을 헤더라고 함
    res.writeHead(200, {'Content-Type':'text/html; charset-utf-8'});
    // 화면에 출력하고 싶은 내용을 적음
    // body 부분이라고 할 수 있음
    res.write('<h1>Hello</h1>');
    // end를 통해 응답을 종료함
    res.end('<p>Node</p>');
})
.listen(8080, () => { // 8080 포트를 사용하여 컴퓨터에 연결함
    console.log('8080 conection')
});
```
포트에 접근하기 위해 인터넷 창에
http://localhost:8080, 또는 http://127.0.0.1:8080 입력
- 위 두 주소는 내부 주소임 == 개발 테스트용
- 숫자 주소 == IP, 문자 주소 == 도메인 주소
- 포트 == 서버에서 돌아가는 프로세스 id
    - 다양한 업무를 처리하는 서버에서 각 업무에 맞춰 프로세스를 돌리기 때문(DB, 파일, http, sock)
    - 즉, 한가지 포트에 여러 프로세스를 연결한다는 건 불가능!(포트 == 프로세스 id)
***
```javascript
const http = require('http')
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html; charset-utf-8'});
    res.write('<h1>Hello</h1>');
    res.end('<p>Node</p>');

    // 에러를 던지면 서버가 죽어버림
    throw new Error('Check')
});
server.listen(8080);

// 따로 이벤트 핸들러를 통해 연결을 확인할 수 있음
server.on('listening', () => {
    console.log('8080 conection')
});
// 에러를 잡아내는 핸들러
server.on('error', (err) => {
    console.error(err)
});
```
한번에 여러 서버를 실행 시킬 수 있음
- 01_server.js 파일을 복붙하고 port만 변경시키면 가능함
- 하지만 한 파일에서 여러 서버를 만드는 경우는 드물다!
***
html 파일을 자바 스크립트로 작성하는 것은 비효율적임
- html 파일을 만들고 ! 엔터를 통해 대충 만들자
```javascript
const http = require('http')
const fs = require('fs').promises

http.createServer(async (req, res) => {
    try{
        // 파일 읽어오기
        const data = await fs.readFile('00_server2.html');
        res.writeHead(200, {'Content-Type':'text/html; charset-utf-8'});
        res.end(data);
    }catch (err) {
        // 에러가 어떤건지
        console.error(err);
        // 500은 서버에서 문제가 생겼을 때 나오는 에러
        res.writeHead(500, {'Content-Type':'text/plain; charset-utf-8'});
        res.end(err.message);
    }
})
.listen(8080, () => {
    console.log('8080 conection')
});
```
> 상태 코드
> - 2XX : 성공(성공, 작성됨)
> - 3XX : 리다이렉트 (영구 이동, 임시 이동, 수정되지 않음)
> - 4XX : 요청 오류(잘못된 요청, 권한 없음, 금지, 찾을 수 없음)
> - 5XX : 서버 오류(내부 서버 오류, 불량 게이트 웨이. 서비스를 사용할 수 없음)
***
현재는 요청이 한개임.. 요청을 어떻게 늘리지?
- 앱이 화면을 보여달라 하는 것과 웹에서 화면을 보여달라는 것은 다름
# Rest와 라우팅 사용하기
서버는 주소를 통해 요청 내용을 표현함
- 잘 표현하기 위해 Rest 가 등장(REpresentational State Transfer)
> ## 법칙
> 1. 주소는 명사로 작성되야함 (사용자, 정보 등등)
> 2. 요청 메소드가 존재함(get, post, put, patch, delete, option)
>       - 가져오기, 등록하기, 치환하기, 일부 수정하기, 삭제하기, 통신 전 옵션을 정함
- 겹치는 요청은 cash에 저장됨으로 속도를 빠르게 올릴 수 있음
***
다양한 요청을 생각 했다면 그에 맞게 REST 구조를 짬
|HTTP 메서드|주소|역할|
|:------:|:--:|:-:|
|GET|/|main.html 제공|
|GET|/about|about.html 제공|
|GET|/users|사용자 목록 제공|
|GET|기타|정적 파일 제공|
|POST|/user|사용자 등록|
|PUT|/user/user_id|해당 id의 사용자 수정
|DELETE|/user/user_id|해당 id의 사용자 삭제
***
프론트는 제공된 코드를 그대로 복붙함
- 벡엔드 코드
```javascript
const http = require('http')
const fs = require('fs').promises

http.createServer(async (req, res) => {
    try{
        console.log(req.method, req.url);
        // get 통신일 때!
        if (req.method === 'GET'){
            // 메인일 때
            if (req.url === '/'){
                const data = await fs.readFile('./restFront.html')
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                return res.end(data);
            // about 일 때
            } else if (req.url === '/about'){
                const data = await fs.readFile('./about.html')
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                return res.end(data);
            } 
        }
        try{
            // 기타는 파일 불러오기
            const data = await fs.readFile(`.${req.url}`)
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                return res.end(data);
        } catch (err){
            console.error(err);
            res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'})
            res.end(err.message)
        }
    } catch (err){
        
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
        res.end(err.message)
    }
})
.listen(8080, () => {
    console.log('8080 conection')
});
```
user 관련 요청을 넣지 않았지만.. 매우 복잡해진다.
- res, req를 사용한다고 함수가 종료되지 않는다! return을 해주자!
***
작동시 요청 주소(url), 요청 메서드(get, put), http 응답 코드(200, 404), 통신 프로토콜(http), 요청 종류(html, css, js)등 다양한 정보를 알아 낼 수 있음

단 서버가 꺼졌다가 켜지면, 모든 정보가 날라감
- 이 문제를 해결하기 위해 DB를 배움
# 쿠키와 세션 이해하기
클라이언트가 요청을 보낼 때 누가 보낸지 알 수 없음
- IP, 브라우저 정보는 가져올 수 있지만, 같은 컴퓨터에 유저가 여러 명이 있을 수 있음
- 로그인 기능을 통해 유저 정보를 알아내면 될 것인데 어떻게 구현하지??
- 쿠키와 세션을 알아야함
***
- 왜 새로 고침을 해도 로그인이 유지 되는가?
- 클라이언트에서 유저 정보를 지속적으로 넘겨주기 때문!
***
- 서버는 요청에 대한 응답을 할 때 쿠키를 같이 넘겨줌(너는 누구다!)
- 클라이언트는 쿠키를 저장했다가, 요청시 쿠키를 같이 전달함!
- 그럼 쿠키에 아이디 비번을 같이 저장하는 것은.. 말이.. 되구?
    - 보안에 취약함! 그러지 말자!
```javascript
const http = require('http')
const fs = require('fs').promises
const url = require('url')
const qs = require('querystring')
// 쿠키에 담겨져 있는 내용을 객체화 해주는 함수
const parseCookies = (cookie = '')=>
    cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k,v]) =>{
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    
    console.log(cookies);
    if(req.url.startsWith('/login')){
        // 쿼리를 분석해서 내용 알아내기
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        // 현재 시간 알아내기
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            // 한글 회피
            'Set-Cookie':`name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
        //쿠키에 이름이 있으면 이름 출력
    } else if (cookies.name){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요!`)
    } else{
        try{
            const data = await fs.readFile('02_node/04_http/06_front/cookie2.html');
            res.writeHead(200, {'Content-Type':'text/html; charset-utf-8'});
            res.end(data);
        } catch(err) {
            console.error(err)
            res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(err.message)
        }

    }
})
.listen(8080, ()=>{
    console.log(8080)
})
```
쿠키는 다양한 옵션이 있음
- 쿠키명=쿠키값 : 기본적인 쿠키 값 넣기
- Expires=날짜 : 쿠키 종료 기간 default == 클라이언트 종료까지
- Max-age=초 : 위와 동일하지만, 초 단위 expires 보다 강력함
- Domain=도메인명 : 쿠키가 전송될 도메인을 특정함 -> 기본값은 현재 도메인(localhost)
- Path=URL : 쿠키가 전송될 도메인을 특정할 수 있음 -> 기본값이 '/' 모든 URL이 쿠키를 전송할 수 있음
- Secure : https 만 전송 가능
- HttpOnly : 클라이언트가 쿠키 조작을 할 수 없음 

전송결과 유저의 이름을 모두 볼 수 있게 됨...
# http와 http2
http 모듈은 웹 서버에 SSL 암호화를 추가함
- https 암호화 제공
- http2 속도 개선

둘다 서비스를 이용해서 파일을 발급받아 사용해야함(생략)
# cluster
싱글 프로세스를 멀티 프로세스로 돌릴 수 있도록 도와줌(멀티 스레드가 아님!!!)
- 즉, 포트를 공유하는 동일한 프로세스가 존재할 수 있다!
- 오류로 인해 한 프로세스가 죽어도 다른 프로세스가 일을 이어서 해줄 수 있음!
- 하지만, 오류가 어디서 생겼는지 알아내야 할 필요가 있음
```javascript
const cluster = require('cluster')
const http = require('http');
// cpu 코어 갯수
const numCPUs = require('os').cpus().length;

// 마스터 
if(cluster.isMaster){
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // CPu 개수만큼 서버를 생성함
    for (let i = 0;i < numCPUs; i += 1){
        cluster.fork();
    }
    // 서버가 종료되면
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커 종료`);
        // 신호가 존재하면 연결함
        console.log('code', code, 'signal', signal);
        // 다시  서버 킴
        cluster.fork();
    });
}else{
    http.createServer((req,res)=>{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end('Node')
        // 1초가 지나면 강제로 종료함
        setTimeout(()=>{
            process.exit(1);
        }, 1000);
    })
    .listen(8080);
    console.log(`${process.pid}`);
}
```
실무에서는 cluster 대신 pm2 모듈을 사용함
- 다양한 정적인 폴더를 제공하거나
- 동적인 자원을 제공하는 일로 주소가 나눠짐
- 그 외로 클러스터링, 쿠키, 세션관리등 다양한 프로그램을 한 파일에 작성하는 것은 힘듬
- 위 문제를 해결하기 위한 모듈인 express가 존재함
