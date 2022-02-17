const str = 'abc';
const num = 1;
const bool = true;
const obj = {
    outside: {
        inside: {
            key: 'val',
        },
    },
};

console.time('전체 시간');
console.log('평범');
console.log(str, num, bool);
console.error('에러');

console.table([{name: '제로', birth:1994}, {name:'hero', birth:1988}]);

console.dir(obj, {colors:false, depth:2});
console.dir(obj, {colors:true, depth:1});

console.time('시간 측정');
for(let i = 0;i<10000;i++) {}
console.timeEnd('시간 측정')

function b(){
    console.trace('에러 위치 추적')
}

function a(){
    b();
}
a();

console.timeEnd('전체 시간')