var express = require("express");
var jsdom = require("jsdom"); 
//var todo = require("todo"); 
var requirejs = require("requirejs"); 

requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require,
});

var ListService = requirejs("app/listService");
var DataManager = requirejs("app/dataManager");
var User = requirejs("app/user");

requirejs(['app/todo', 'app/document'],function(Todo, Document) {
    var app = express();
    app.use(express.static(__dirname + '/public'));
    var dataManager = new DataManager();
    var listService = new ListService(dataManager);
    app.get('/', function(req,res) {
        var doc = new Document();
        var models = {};
        //models.TodoItem = require("./todoitem")(db);
        var serializer = requirejs("./serializer");
        var user = new User(1, listService);
        var todo = new Todo(doc, user);
        doc.addScript("./require.js", null);
        doc.addScript(null, serializer().serialize(todo, dataManager));
        res.write(doc.getOutput());
        res.end();
    });
    app.get('/data/:ajaxId/:method', function(req,res) {
        dataManager.processRequest(
            req.param("ajaxId"),
            req.param("method"), 
            function(result) {
                res.write(result);
                res.end();
            }
        );
    });
    app.listen(3000);
});

