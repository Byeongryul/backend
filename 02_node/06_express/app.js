const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const multer = require('multer');
const fs = require('fs');
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));
app.use('/', indexRouter);
app.use('/user', userRouter);

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더를 생성해야함');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});

app.post('/upload/single', upload.single('img1'), (req, res) => {
  console.log(req.file, req.body);
  res.send('ok');
});

app.post('/upload/muti', upload.array('many'), (req, res) => {
  console.log(req.files, req.body);
  res.send('ok');
});

app.post(
  '/upload/field',
  upload.fields([{ name: 'img1' }, { name: 'img2' }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  },
);

app.post('/upload/none', upload.none(), (req) => {
  console.log(req.body);
});

app.use((req, res, next) => {
  res.clearCookie('key', 'val', { signed: true });
  res.cookie('key', 'val', {
    signed: true,
  });
  console.log('check');
  console.log('요청 완료');
  next();
});

app.get('/', (req, res, next) => {
  // res.send('Hello');
  res.sendFile(path.join(__dirname, '/index.html'));
  next();
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
  next();
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
