var http = require('http');
var url = require('url');
var port = 3001;

http.createServer(function(req,res){

   path = url.parse(req.url,true).pathname;

    console.log(path);
    
    
    
}).listen(port,function(){
    console.log("서버 열려있음!");
});