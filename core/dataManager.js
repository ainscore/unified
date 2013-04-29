define(["callback"], function(Callback) {

    var DataManager = function() {
        this.idGen = 0;
        this.modules = [];
    };

    DataManager.prototype = {

        register: function(moduleId) {
            this.modules.push({
                id:this.idGen,
                module:moduleId,
            });
            return this.idGen++;
        },

        processRequest: function(id, method, callback) {
            var _this = this;
            var module;
            for(var i=0; i<this.modules.length; i++) {
                if(this.modules[i].id = id) {
                    module = this.modules[i];
                }
            }

            requirejs([module.module], function(Service) {
                var serviceObj = new Service();
                serviceObj[method](new Callback(_this, _this.handleResult, [callback]));
            });
        },

        handleResult: function(callback, result) {
            callback(JSON.stringify(result));
        }
    };

    return DataManager;

});

