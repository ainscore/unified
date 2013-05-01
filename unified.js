var requirejs = require("requirejs"); 

var requireConfig = {
    baseUrl: __dirname,
    paths: {
        "klass":"./common/klass",
        "callback":"./common/callback",
        "element":"./core/element",
        "document":"./core/document",
        "serializer":"./core/serializer",
        "dataManager":"./core/dataManager",
        "dataService":"./core/dataService",
        //"app":__dirname + "/example/public/app",
    },
    nodeRequire: require,
};

requirejs.config(requireConfig);

var Klass = requirejs("klass");
var Doc = requirejs("document");
var serializer = requirejs("serializer");
var DataManager = requirejs("dataManager");
var DataService = requirejs("dataService");
var express = require("express");

var delivery = Klass({
    initialize: function() {
        var _this = this;
        this.dataManager = new DataManager();
        this.models = {};
        this.app = null;
        this.expressApp = express();
        this.scriptDir = null;
        this.scriptUrl = null;
        this.publics = [];

        this.expressApp.get('/', this.coreHandler());
        this.expressApp.get('/data/:ajaxId/:method', this.dataHandler());
        this.expressApp.use("/_unified", 
            function(req,res,next){
                var path = req.path.match(/\/(.*)\.js$/);
                for(var i=0; i<_this.publics.length; i++) {
                    //console.log(_this.publics[i].url)
                    if(path.indexOf(_this.publics[i].url) === 0) {
                        express.static(_this.publics[i].dir)(req,res,next)
                    }
                }
                path = "./" + path[1];
                requirejs([path], function(module) {
                    if(module && module.prototype && module.prototype.__KLASS__ && module.spawnOf(DataService)) {
                        res.end(DataService.serializeModule(module, this.dataManager));
                    }else {
                        //console.log(req.path);
                        express.static(__dirname + "/common")(req,res,next);
                    }
                });
            }
        );
    },
    getDataManager: function() {
        return this.dataManager;
    },
    getExpress: function(app) {
        return this.expressApp;
    },
    setApp: function(app) {
        this.app = app;
    },
    getLoader: function() {
        return requirejs;
    },
    addModel: function(name, model) {
        this.models[name] = model;
    },
    setScriptDir:function(scriptDir) {
        this.scriptDir = scriptDir;
    },
    setPublic:function(url, dir) {
        this.publics.push({url:url,dir:dir});
        requireConfig.paths[url] = dir;
        requirejs.config(requireConfig);
        this.expressApp.use("/_unified/" + url, express.static(dir));
    },
    coreHandler:function() {
        var _this = this;
        return function(req,res) {
            var doc = new Doc();
            var todo = new (_this.app)(doc, _this.models);
            doc.addScript("/_unified/require.js", null);
            doc.addScript(null, serializer().serialize(todo, _this.dataManager));
            res.write(doc.getOutput());
            res.end();
        };
    },
    dataHandler:function() {
        var _this = this;
        return function(req,res) {
            _this.dataManager.processRequest(
                req.param("ajaxId"),
                req.param("method"), 
                req.param("args"), 
                function(result) {
                    res.write(result);
                    res.end();
                }
            );
        };
    }
});

module.exports = delivery;
