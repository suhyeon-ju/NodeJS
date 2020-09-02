//Express 기본 모듈 불러오기
var express = require('express')
, http = require('http')
, path = require('path');

//Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    ,cookieParser = require('cookie-parser')
    ,static = require('serve-static')
    ,expressSession = require('express-session')
    ,errorHandler = require('errorhandler');

var expressErrorHandler = require('express-error-handler');

//익스프레스 객체 생성
var app = express();
//기본 속성 설정 -> process.env의 기본 포트가 있으면 사용하거나 3000 사용
app.set('port', process.env.PORT || 3000);
//public 폴더 안에 있는 것 사용
app.use('/public', static(path.join(__dirname, 'public')));

//body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false}));
//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

//미들웨어로 등록, cookie-parser 설정
app.use(cookieParser());
//세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

//라우터 사용하여 라우팅 함수 등록
var router = express.Router();

app.use('/', router);

//오류 페이지 보여 주기
var errorhandler = expressErrorHandler({
   static: {
       '404' : './public/404.html'
   } 
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});


