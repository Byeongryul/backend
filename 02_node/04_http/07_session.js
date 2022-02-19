const http = require('http')
const fs = require('fs').promises
const url = require('url')
const qs = require('querystring')

const parseCookies = (cookie = '')=>
    cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k,v]) =>{
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});
// 로컬 세션은 서버가 꺼질 때 데이터가 다 날라감
// 세션 전용 DB를 사용할 이유(레디스)
const session = {};

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    
    console.log(cookies);
    console.log(session[cookies.session]);
    if(req.url.startsWith('/login')){
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now();
        session[uniqueInt] = {
            name,
            expires,
        };
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie':`session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session]?.expires > new Date()){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요!`)
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