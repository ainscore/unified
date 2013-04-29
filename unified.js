var requirejs = require("requirejs"); 

requirejs.config({
    baseUrl: __dirname,
    paths: {
        "klass":"./common/klass",
        "callback":"./common/callback",
        "element":"./core/element",
        "document":"./core/document",
        "serializer":"./core/serializer",
        "dataManager":"./core/dataManager",
        "dataService":"./core/dataService",
    },
    nodeRequire: require,
});

var Klass = requirejs("klass");
var Doc = requirejs("document");
var serializer = requirejs("serializer");
var DataManager = requirejs("dataManager");

var delivery = Klass({
    initialize: function() {
        this.dataManager = new DataManager();
        this.models = {};
        this.app = null;
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
    coreHandler:function() {
        var _this = this;
        return function(req,res) {
            var doc = new Doc();
            var todo = new (_this.app)(doc, _this.models);
            doc.addScript("./require.js", null);
            doc.addScript(null, serializer().serialize(todo, _this.dataManager));
            res.write(doc.getOutput());
            res.end();
        };
    },
    dataHandler:function() {
        var _this;
        return function(req,res) {
            _this.dataManager.processRequest(
                req.param("ajaxId"),
                req.param("method"), 
                function(result) {
                    res.write(result);
                    res.end();
                }
            );
        };
    }
});

module.exports = delivery;
