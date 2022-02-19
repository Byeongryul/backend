const http = require('http')

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie':['mycookie=1', 'first=2']});
    res.end('Hello');
})
.listen(8080, () =>{
    console.log('8080 connection')
})