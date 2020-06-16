exports.template = function template(page,query,query2 = "NULL"){
    return `<html>
    <head>
    <meta charset='utf-8'>
    </head>
    <body>
    <font size='7' color='red'>${page}Page! 안녕하세요 !~~~</font>
    <br>사용자가 보내주는 Query String : ${query}
    <br>사용자가 보내주는 Query String2 : ${query2}
    </body>
    </html>`;
}

exports.table = function table(num){
    let str = "<html><body><table border=1>";
        for (let td = 0; td < num; td++) {
            str += '<td>' + (td+1) + '</td>';
        }
        str+= "</table></body></html>"

    return str;
}