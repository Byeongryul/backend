# 자바스크립트
## ES2015+
### const, let
```javascript
if(true){
    var x = 3;
}
console.log(x);
```
```javascript
if (true){
    const y = 3;
}
console.log(y);
```
- var는 함수 스코프를 가집니다
- const는 블록 스코프를 가집니다.
- 블록 스코프를 사용함으로 [호이스팅](https://namu.wiki/w/호이스팅) 같은 문제로 해결됨
```javascript
const a = 0;
a = 1; // 에러
let b = 0;
b = 1;

const c;
```
## 템플릿 문자열
쉽게 문자열을 만들 수 있음
```javascript
var num1 = 1;
var num2 = 2;
var result = 3;
var string1 = num1 + '더하기 ' + num2 + '는 \'' + result + '\'';
console.log(string1);
```
```javascript
const num3 = 1;
const num4 = 2;
const result2 = 3;
const string2 = `${num3} 더하기 ${num4} '${result2}'`;
console.log(string2);
```
## 객체 리터럴
편의 기능(속성)
```javascript
var sayNode = function(){
    console.log('Node');
};
var es = 'ES';
var oldObject = {
    sayJS: function(){
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic';
oldObject.sayNode();
oldObject.sayJS();
console.log(olbObject.ES6)
```
```javascript
const newObject = {
    sayJS(){
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fantastic',
};

newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6)
```
메서드와 속성을 정할 때 편해지고 변수를 통해 속성을 정할 수 있음
## 화살표 함수
```javascript
function add1(x, y){
    return x + y;
}
const add2 = (x, y) => {
    return x + y;
}
const add3 = (x, y) => x + y;
const add4 = (x, y) => (x + y);
function not1(x){
    return !x;
}
const not2 = x => !x;
```
기존 function과 차이점은 this! 바인드 방식
```javascript
var relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
        var that = this;
        this.friends.forEach(function (friend){
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriends();
```
```javascript
const relationship2 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
}
relationship2.logFriends();
```
각자 다른 함수 스코프의 this를 가지면 this의 범위가 달라진다. 즉, 간접적으로 접근하게 되는데 화살표 함수는 위의 this를 접근할 수 있음
## 구조분해 할당
```javascript
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function (){
        this.status.count--;
        return this.status.count;
    },
}
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
```
```javascript
const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy(){
        this.status.count--;
        return this.status.count;
    },
}
const {getCandy, status:{count}} = candyMachine;
```
각 요소를 접근 할 때 객체에 선언하듯이 받아낼 수 있음
```javascript
var array = ['nodejs', {},10,true];
var node = array[0];
var obj = array[1];
var bool = array[3];
```
```javascript
const array = ['nodejs', {},10,true];
const {node, obj, , bool} = array;
```
각 요소를 뽑아서 나열함
## 클래스
```javascript
var Human = function(type){
    this.type = type || 'human';
};
Human.isHuman = function(human){
    return human instanceof Human;
}
Human.prototype.breathe = function(){
    console.log('h-a-a-a-m');
}
var Zero = function(type, firstName, lastName){
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
};
Zero.prototype = Object.create(Human.prototype);
Zero.prototype.construction = Zero;
Zero.prototype.sayName = function(){
    console.log(this.firstName + ' ' + this.lastName);
};
var oldZero = new Zero('human', 'Zero', 'Cho')
```
```javascript
class Human{
    constructor(type = 'human'){
        this.type = type;
    }
    static isHuman(human){
        return human instanceof Human;
    }
    breathe(){
        console.log('h-a-a-a-m');
    }
}
class Zero extends Human{
    constructor(type, firstName, lastName){
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayName(){
        super.breathe();
        console.log(`${this.firstName} ${this.lastName}`);
    }
}
const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero);
```
문법이 변경되었지만, 실제로 prototype의 형식으로 작동됨
## 프로미스
비동기의 이벤트 리스너를 효과적으로 사용하기 위해 콜백함수를 사용합니다. 하지만 콜백함수가 많아질수록 가독성이 떨어집니다. 그 부분을 해결하기 위해 프로미스가 생겼습니다.
```javascript
const condition = true;
const promise = new Promise((resolve, reject) => {
    if (condition){
        resolve('성공');
    } else {
        reject('실패');
    }
});

promise
.then((message) => {
    console.log(message);
})
.catch((error) => {
    console.log(error);
})
.finally(() => {
    console.log('무조건');
})
```
- resolve의 경우 성공하여 then으로 이동하고
- reject의 경우 실패하여 catch로 이동하게 됨
```javascript
promise
.then((message) => {
    return new Promise((resolve, reject) => {
        resolve(message);
    });
})
.then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
        resolve(message2);
    });
})
.then((message3) => {
    console.log(message3);
})
.catch((error) => {
    console.error(error);
})
```
순차적으로 실행해야 하는 내용이 존재할 때 프로미스를 연결하여 작동할 수 있음
```javascript
function findAndSaveUser(Users){
    Users.findOne({}, (err, user) => {
        if (err){
            return console.error(err);
        }
        user.name = 'zero';
        user.save((err) => {
            if (err){
                return console.error(err);
            }
            Users.findOne({gender: 'm'}, (err, user) => {
                console.log('생략')
            });
        })
    })
}

function findAndSaveUser(Users){
    Users.findOne({})
    .then((user) => {
        user.name = 'zero';
        return user.save();
    })
    .then((user) => {
        return Users.findOne({gender: 'm'});
    })
    .then((user) => {
        console.log('생략');
    })
    .catch(err =>{
        console.error(err);
    })
}
```
층이 계속 증가하고 있는 모습과 달리 밑의 내용은 순차적으로 접근하는 것을 볼 수 있음
## async/await
then과 catch를 계속 반복하기 때문에 이것도 정리할 수 있습니다.
```javascript
async function findAndSaveUser(Users){
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({gender: 'm'});
}
```
에러를 잡기위해 try catch문이 필요함
```javascript
async function findAndSaveUser(Users){
    try{
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender: 'm'});
    } catch (error){
        console.error(error)
    }
};
```
```javascript
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async () => {
    for await (promise of [promise1, promise2]){
        console.log(promise);
    }
})();
```
반복문을 통해 await를 돌림
# 프런트엔드 자스크릡트
프론트 단의 코드를 봤을 때 약간 이해할 수 있는 수준 까지만 다룸
## AJAX
비동기적 웹 서비스 개발에 사용하는 기법
- 페이지 이동 없이 서버에 요청을 보내고 응답을 받는 기술
- 보통 JQuery나 axios를 사용하는데 여기서는 axios로 구현함
## FormData
form 태그의 데이터를 동적으로 제어할 수 있는 기능입니다.
## encodeURIComponent, decodeURIComponent
한글을 서버가 이해하지 못할 때를 대비하여 인코딩, 디코딩을 실시합니다.
## 데이터 속성과 dataset
보안과 관련된 정보를 제외한 정보를 프론트에서는 어떻게 저장할지 나타낸 방법입니다.
- 카멜 표기법으로 표시된 형식을 변경하여 저장합니다.
    - manyData -> data-many-data