define(["callback", "klass"], function(Callback, Klass) {

    var DataManager = Klass({
        initialize: function() {
            this.idGen = 0;
            this.modules = [];
            this.storage = {};
        },

        register: function(moduleId) {
            for(var i=0; i<this.modules.length; i++) {
                if(this.modules[i].module === moduleId) {
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
                if(this.modules[i].id == id) {
                    module = this.modules[i];
                }
            }

            if(!module) {
                console.log("data module not found");
                return;
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
    });

    return DataManager;

});

