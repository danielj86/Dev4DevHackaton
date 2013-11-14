var http = require('http');
var express = require('express');
var fs = require("fs");
var path = require("path");

var host = "127.0.0.1";
var port = 80;

var httpServer = null;
var app = express();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    //app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
        secret: 'the cake is a lie'
    }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.post('/temp', function(req, res) {
    console.log("temperature is : " + req.body.temperature);
    console.log(req);

    res.write(req.body);
    res.end();
})

app.get("/", function(request, response) { //root dir
    var indexPage = path.join(process.cwd(), "/Index.html");
    fs.readFile(indexPage, "binary", function(err, file) {
        if (err) {
            response.writeHead(500, {
                "Content-Type": "Script"
            });
            response.write(err + "\n");
            response.end();
            return;
        }

        response.writeHead(200);
        response.write(file, "binary");
        response.end();
    });
});

app.listen(port);