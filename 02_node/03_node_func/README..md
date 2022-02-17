# REPL 사용하기
읽고(Read), 해석하고(Eval), 결과문을 반환하고(Print), 반복함(Loop)
```javascript
const str = 'Hello'; // undefined
cosole.log(str); // Hello
```
여러 줄을 돌릴 때는 파일을 만듬
# js 파일 실행
파일을 만들어서 코드를 돌려보자
```javascript
// 00_test.js
function helloWorld(){
    console.log('hello');
    helloNode();
}
function helloNode(){
    console.log('node');
}
helloWorld();
```
```
node 00_test
```
# 모듈로 만들기
js 파일을 모아두어 필요할 때 가져다가 사용함
```javascript
//var.js
const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = {
    odd,
    even,
}
```
```javascript
//func.js
const {odd,even}=require('./var');

function checkOddOrEven(num){
    if (num % 2){
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;

```
```javascript
// index.js
const {odd, even} = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(num){
    if (String.length % 2){
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'))
```
# 노드 내장 객체 알아보기
## global
전역 객체 지금부터 보는 객체는 global에 들어 있음
## console
보통 log를 찍을 때 사용함
- 다양한 포맷을 포함함
## 타이머
타이머 기능으로 일정 시간마다 일을 할 수 있음
- 주어진 시간 후 콜백
- 주어진 시간 마다 콜백 반복 실행
- 즉시 실행
아이디 값을 통해 취소할 수 있음
## __filename, __dirname
파일 위치와 파일 이름을 알아 낼 수 있음
## module, exports, require
module 없이 모듈을 만들 수 있음
- 참조 관계를 잘 유지해야함
require가 서로 달려있을 때 한 개가 상속하지 못함
## process
프로세스의 환경변수, 콜백 현황, 코드 종료 등 다양한 기능이 탑재
# 노드 내장 모듈 사용하기
## os
운영체제, 경로, cpu 정보, 메모리 정보 등을 알아 낼 수 있음
## path
페스 정보와 관련된 다양한 정보를 알아낼 수 있음
- 구분자, 환경 변수, 파일 위치, 확장자, 파셔, 절대 경로
## url
url 정보를 토대로 다양한 구조를 알아내거나, 구조를 맞춰서 url를 생성함
- searchParams를 사용하여 url 구성을 변경하거나 더함
## querystring
search 부분을 쉽게 사용하기 위해 존재
## crypto
암호화를 도와주는 모듈
- 단반향 암호화, 양반향 암호화를 지원한다.
## util
각종 편의 기능을 모아둔 모듈
## worker_threads
멀티 스레드 방식으로 작업하는 방법
## child_process
멀티 프로세싱을 지원하는 모듈
- 다른 프로그램을 실행하고 결과를 받아옴
## 보면 좋은 모듈
- assert: 값을 비교하여 테스트
- dns: 도메인의 IP 주소 알아냄
- net: TCP, IPC 통신
- string_decoder: 버퍼 데이터를 문자열로 변경
- tls: TLS와 SSL에 관련된 작업
- tty: 터미널과 관련된 작업
- dgram: UDP 관련 작업
- v8: v8 엔진 직접 접근
- vm: 가상 머신 직접 접근
# 파일 시스템 접근
숫자를 문자로 변경해야 하는 경우가 존재함
- 순서대로 입력 받기 위해 promise를 자주 사용함
## 동기와 비동기
파일 입출력은 기본적으로 비동기로 작동하기에 순서가 변경 될 수 있음
- ```fs.readFileSync``` 를 통해 동기 작업을 할 수 있도록 할 수 있음
- 하지만 비동기로 인해 작업을 기다려야 할 수 있음
## 버퍼와 스트림 이해하기
데이터를 읽고 쓸 때는 버퍼와 스트림 중에 한가지 방식을 체택함
- 로딩(모두 살림), 스트림(연속적으로 보냄)
- Buffer 클래스를 통해 개발이 가능함
- 스트림 방식을 사용하면, 메모리를 과하게 사용하지 않을 수 있음
## 기타 fs 메서드 알아보기
- 접근 가능한지, 폴더 만들기, 파일 변수 가져오기, 파일 이름 바꾸기
## 스레드풀 알아보기
컴퓨터의 코어 개수에 따라 나눠서 실행됨
# 이벤트 이해하기
on, emit, once, removeAllListeners, removeListener, off, listenerCount
# 예외 처리하기
- try, catch, finally
- throw new Error()