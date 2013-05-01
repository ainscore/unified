define(["callback"], function(Callback) {

    var DataManager = function() {
        this.idGen = 0;
        this.modules = [];
        this.storage = {};
    };

    DataManager.prototype = {

        register: function(moduleId) {
            for(var i=0; i<this.modules.length; i++) {
                if(this.modules[i].moduleId === moduleId) {
                    return this.modules[i].id;
                }
            }
            this.modules.push({
                id:this.idGen,
                module:moduleId,
            });
            return this.idGen++;
        },

        processRequest: function(id, method, args, callback) {
            var _this = this;
            var module;
            for(var i=0; i<this.modules.length; i++) {
                if(this.modules[i].id = id) {
                    module = this.modules[i];
                }
            }

            requirejs([module.module], function(Service) {
                var serviceObj = new Service(_this);
                var argsArray = args.split(",");
                argsArray.push(new Callback(_this, _this.handleResult, [callback]));
                serviceObj[method].apply(serviceObj, argsArray);
            });
        },

        handleResult: function(callback, result) {
            callback(JSON.stringify(result));
        },

        getStorage: function() {
            return this.storage;
        }
    };

    return DataManager;

});

