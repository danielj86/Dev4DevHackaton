var http = require('http');
var express = require('express');
var fs = require("fs");
var path = require("path");

var host = "127.0.0.1";
var port = 80;

var httpServer = null;
var app = express();
var sensData = {
    temperature: 999
};

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
    console.log(req.body);
    sensData = {
        temperature: req.body.temperature
    }
    res.end();
})

app.get("/", function(request, response) { //root dir
    var indexPage = path.join(process.cwd(), "/public/dist/index.html");
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

app.get("/planning", function(request, response) {

    var indexPage = path.join(process.cwd(), "/public/dist/planning.html");
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

app.get("/maintenance", function(request, response) {

    var indexPage = path.join(process.cwd(), "/public/dist/maintenance.html");
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

app.get("/sens", function(request, response) {
    response.writeHead(200);
    response.write(sensData.temperature.toString());
    response.end();
});

app.listen(port);