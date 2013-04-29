var express = require("express");
var Unified = require("./unified"); 

var unified = new Unified();
var requirejs = unified.getLoader();

var ListService = requirejs("app/listService");
var User = requirejs("app/user");
var Todo = requirejs("app/todo");
var Doc = requirejs("document");

var app = express();
app.use(express.static(__dirname + '/public'));


var listService = new ListService();
var user = new User(1, listService);
unified.addModel("user", user);
unified.setApp(Todo);

app.get('/', unified.coreHandler());
app.get('/data/:ajaxId/:method', unified.dataHandler());

app.listen(3000);

