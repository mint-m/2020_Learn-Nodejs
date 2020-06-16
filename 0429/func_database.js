var conn = require('./config_database.js');
var express = require('express');


exports.join = function(req,res){
    let id = req.body.id;
    let pw = req.body.pw;
    let nick = req.body.nick;
    let sql = "insert into `member` values(?, ?, ?)"

    conn.query(sql,[id,pw,nick] ,function(err, rows){
        if(!err){
            console.log("입력 성공");
        }else{
            console.log("입력 실패");            
        }
    }); //DB에 Query를 전송하는 부분
    res.send("DB연결 성공");
}

exports.update = function(req,res){
    let id = req.body.id;
    let pw = req.body.pw;
    
    let sql = "Update `member` set pw=? where id=?"

    conn.query(sql,[pw, id] ,function(err, rows){
        if(!err){
            console.log("변경 성공");
        }else{
            console.log("변경 실패");            
        }
    }); //DB에 Query를 전송하는 부분
    res.send("성공");
}

exports.oneSelect = function(req,res){
    let id = req.body.id;

    let sql = "Select * from `member` where id=?"

    conn.query(sql,[id] ,function(err, rows){
        if(!err){
            res.send("검색된 정보 <br>"+ rows[0].id +"<br>"+ rows[0].pw  +"<br>"+rows[0].nickname);            
        }else{
            res.send("w==w안보영");
        }
    }); //DB에 Query를 전송하는 부분
}

exports.allSelect = function(req,res){
    
    let sql = "Select * from `member`"

    conn.query(sql ,function(err, rows){
        if(!err){        
            // let st ="";
            // for(let i=0; i<rows.length; i++){
            //     st += rows[i].id+"    ";
            //     st += rows[i].pw+"    ";
            //     st += rows[i].nickname+"    ";
            //     st += "<br>"
            // }
            // res.send(st);

            res.render('allSelect', {rows:rows});

            // res.write('<html><head><meta charset="UTF-8"></head><body><table border=1>');
            // for(let i=0; i<rows.length; i++){
            //     res.write('<tr>')
            //     res.write('<td>')
            //     res.write(rows[i].id);
            //     res.write('</td>')
            //     res.write('<td>')
            //     res.write(rows[i].pw);
            //     res.write('</td>')
            //     res.write('<td>')
            //     res.write(rows[i].nickname);
            //     res.write('</td>')
            //     res.write('</tr>')
            // }
            // res.write('</table></body></html>')
            // res.end();
        }else{
            res.send("p");
        }
    }); //DB에 Query를 전송하는 부분
}

exports.delete = function(req,res){
    let id = req.query.id;
    // console.log("QueryString으로 넘어온 ID값 : "+id);
    

    let sql = "delete from `member` where id=?"

    conn.query(sql,[id] ,function(err, rows){
        if(!err){
            // console.log("삭제 성공");
            res.redirect('http://localhost:3000/selectall');
        }else{
            console.log("삭제 실패");            
        }
    }); //DB에 Query를 전송하는 부분
   // res.send("성공");
}


exports.loginCheck = function(req,res){
    let id = req.body.id;
    let pw = req.body.pw;
    
    let sql = "select * from `member` where id=? and pw=?"

    conn.query(sql,[id,pw] ,function(err, rows){
        if(rows[0]){
            //res.redirect('http://127.0.0.1:5500/0429/LoginS.html');
            // Login.ejs로 이동후 현재 로그인에 성공한 사람의 아이디를 함께 전송
            res.render('LoginS',{id : req.body.id});
        }else{
            res.redirect('http://127.0.0.1:5500/0429/LoginF.html');
        }
    }); 
}