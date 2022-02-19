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
