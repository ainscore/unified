define([ "require","module" ], function(require,module) {

    var Event = function(object, func, args) {
        this.object = object;
        for(var prop in object) {
            if(object[prop] === func) {
                this.func = prop;
            }
        }
        this.args = args;
    };

    Event.prototype = {
        execute: function() {
            var args = Array.prototype.slice.call(arguments);
            this.args = this.args.concat(args);
            (this.object[this.func]).apply(this.object, this.args);
        },
        getModule: function() {
            return module.id;
        }
    };

    return Event;

});
