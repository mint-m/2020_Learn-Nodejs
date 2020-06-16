var http = require('http');
var url = require('url');
var qs = require('querystring');


http.createServer(function(req,res){
    var path = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query;

    if(path === '/plus'){
        let num1 = parseInt(query.num1);
        let num2 = parseInt(query.num2);
        let cal = query.cal;
        if(cal === '+'){
            res.end((num1+num2).toString());
        }else if(cal === '-'){
            res.end((num1-num2).toString());
        }else if(cal === '*'){
            res.end((num1*num2).toString());
        }else{
            res.end((num1/num2).toString());
        }
        // res.end("ID : " +query.id + "PW : " +query.pw);
    }else if(path === '/grade'){
        let body = "";

     
     
        req.on('data', function(data){
            body += data;
        });

     
     
        req.on('end', function(){
            var post = qs.parse(body);
            res.write(post.text);
            res.end();
        })
    }


}).listen(3001);