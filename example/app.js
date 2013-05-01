var Unified = require("../unified"); 

var unified = new Unified();
unified.setPublic("app", __dirname + '/app');
var load = unified.getLoader();

var ListService = load("app/listService");
var User = load("app/user");
var Todo = load("app/todo");
var Doc = load("document");

var storage = unified.getDataManager().getStorage();

storage['1'] = [
    {
        title:"Go to work",
        list:"todo"
    },
    {
        title:"Get a Job",
        list:"inprogress"
    },
];

var listService = new ListService(unified.getDataManager());
var user = new User('1', listService);
unified.addModel("user", user);
unified.setApp(Todo);

unified.getExpress().listen(3000);

