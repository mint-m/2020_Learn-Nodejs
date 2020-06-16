var http = require('http');
//로컬 IP : 127.0.0.1 / Localhost
var url = require('url');
var qs = require('querystring');



http.createServer(function(req, res) {

    var path = url.parse(req.url, true).pathname;
    var query = url.parse(req.url, true).query;


    console.log(req.url);
    console.log(path);
    console.log(query.id);

    if(path === '/table'){
        let str = temp.table(query.id);
        res.end(str);
    }

    if(path === '/html'){
        let resp = temp.template("HTML", query.id);
        res.end(resp);
    }
    
    if(path === '/query'){
        let resp;
        if(query.id2){
            resp = temp.template("query", query.id,query.id2);
        }
        else{
            resp = temp.template("query", query.id);
        }
        res.end(resp)
    }
    
    if (path === '/nodejs') {
        let resp = temp.template("Nodejs", query.id);
        res.end(resp);
    } else {
        res.end("not found 404");
    }

}).listen(3000);