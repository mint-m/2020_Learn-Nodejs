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
            let name = post.name;
            let html = parseInt(post.html);
            let css = parseInt(post.css);
            let nodejs = parseInt(post.nodejs);
            let android = parseInt(post.android);

            let avg = (html+css+nodejs+android)/4;
            let grade = '';
            if(avg>94){
                grade = 'A+'
            }else if(avg>89){
                grade = 'A'
            }else if(avg>84){

            }else if(avg>79){
                grade = 'B'
            }else if(avg>74){
                grade = 'C'
            }else{
                grade = 'F'
            }

            // res.write("name :"+name+"\n");
            // res.write("html :"+html+"\n");
            // res.write("css :"+css+"\n");
            // res.write("nodejs :"+nodejs+"\n");
            // res.write("android :"+android+"\n");
            // res.write("avg :"+avg+"\n");
            // res.write("grade :"+grade+"\n");
            // res.end();

            res.end(`
            <html>
                <meta charset='utf-8'>
                <body>
                    <br><hr><br>
                    name: ${name}<br>
                    html: ${html}<br>
                    css: ${css}<br>
                    nodejs: ${nodejs}<br>
                    android: ${android}<br>
                    avg: ${avg}<br>
                    grade: ${grade}<br>
                </body>
            </html>
            `);
        });
    }


}).listen(3001);