var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ejs = require('ejs'); // Template Engine 중 ejs 모듈을 로드함
var func = require('./func_database.js');
var port = 3000;

// app.use(function(req,res, next){
//     console.log("첫번째 미들웨어 실행!");
//     next();
// });

// app.use(function(req,res, next){
//     console.log("두번째 미들웨어 실행!");
// });

app.use(bodyParser.urlencoded({extended:false})); // middle ware
app.set('view engine', 'ejs');


app.get('/',function(req,res){
    res.render('index',{
        num : 5
    });
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

app.post('/selectall',function(req,res){
    func.allSelect(req,res);
});

app.get('/selectall',function(req,res){
    func.allSelect(req,res);
});

app.listen(port, function(){
    console.log(`${port} 포트로 서버 실행중!`);
    
})