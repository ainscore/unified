var express = require("express");
var jsdom = require("jsdom"); 
//var todo = require("todo"); 
var requirejs = require("requirejs"); 

requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require,
});

requirejs(['app/todo', 'app/document'],function(Todo, Document) {
    var app = express();
    app.use(express.static(__dirname + '/public'));
    app.get('/', function(req,res) {
        var doc = new Document();
        var models = {};
        //models.TodoItem = require("./todoitem")(db);
        var serializer = requirejs("./serializer");
        var todo = new Todo(doc);
        todo.createElements();
        doc.addScript("./require.js", null);
        doc.addScript(null, serializer().serialize(todo));
        res.write(doc.getOutput());
        res.end();
    });
    app.listen(3000);
});

