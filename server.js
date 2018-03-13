var express = require('express');

var app = express();

app.use(express.static("public"));

app.get('/',function (request,response){
    response.sendfile(__dirname +'/public/index.html');
});

app.get('/api/nav.json', function (req,res){
    res.sendfile(__dirname + '/api/nav.json');
});

var port = process.env.PORT || 3000;

app.set('port',port);

app.listen(port, function(){
    console.log('App available at http://localhost:' + port)
});