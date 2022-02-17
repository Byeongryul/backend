console.log('시작');
try{
    throw new Error('서버를 고장내주마!');
}catch(err){
    console.error(err);
}

const fs = require('fs');
fs.unlink('./abc.js', (err) => {
    if (err){
        console.error(err);
    }
})

const fsp = require('fs').promises;
fsp.unlink('./abc.js')

process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
})

throw new Error('고장');

console.log('실행')