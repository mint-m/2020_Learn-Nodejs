var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ejs = require('ejs'); // Template Engine 중 ejs 모듈을 로드함
var func = require('./func_database.js');
var sessionP = require('express-session')
var port = 3000;

var sessionP = require('express-session')

app.use(sessionP({
    secret : "smart0317",
    resave : false,
    saveUninit : true
}));

app.use(bodyParser.urlencoded({extended:false})); // middle ware
app.set('view engine', 'ejs');



app.get('/', function(req, res){
    req.session.user = {
        "name" : "jason",
        "age" : "20"
    };
    console.log("Session 생성 완료");
    // 웹 페이지에 문자열 데이터 전송
    res.render('index', {num: 5});
});


app.post('/td',function(req,res){
    res.render('index',{
        num : req.body.num
    });
});


app.get('/page',function(req,res){
    res.send(`page 페이지${req.query.pageNO}<br>Date : ${req.query.targetDt}`);
});

app.get('/admin/:id/:Dt',function(req,res){
    res.send(`${req.param.id}<br>${req.param.Dt}`);
});

app.get('/numberSum',function(req,res){
    let a,b;
    let s= 0;
    a = parseInt(req.query.start);
    b = parseInt(req.query.end);
    for (let index = a; index <= b; index++) {
        s+=index;
    }

    res.send(`<h1>${req.query.start}~${req.query.end}까지의 합</h1><br>결과 : ${s}`);
});

app.get('/siteMove',function(req,res){
    if(req.query.site === 'google'){
        res.redirect("https://www.google.com");
    }else if(req.query.site === 'naver'){
        res.redirect("https://www.naver.com");
    }else if(req.query.site === 'daum'){
        res.redirect("https://www.daum.net");
    }else{}
   
});

app.post('/loginCheck',function(req,res){
    func.loginCheck(req,res);
});

app.post('/Join',function(req,res){
    func.join(req,res);
});


app.get('/Delete',function(req,res){
    console.log("Delete 호출성공");
    func.delete(req,res);   
});

app.post('/Update',function(req,res){
    func.update(req,res);
});


app.post('/Select',function(req,res){
    func.oneSelect(req,res);
});

app.get('/selectall',function(req,res){
    console.log("session 영역에 있는 user값 :"+req.session.user.name);
    
    func.allSelect(req,res);
});

app.get('/mail', function(req, res){
    res.render('mail', {})
})

app.listen(port, function(){
    console.log(`${port} 포트로 서버 실행중!`);
    
})