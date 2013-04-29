define([ "require","module","klass" ], function(require,module, Klass) {

    var Event = Klass({
        initialize: function(object, func, args) {
            this.object = object;
            for(var prop in object) {
                if(object[prop] === func) {
                    this.func = prop;
                }
            }
            this.args = args || [];
        },
        execute: function() {
            var args = Array.prototype.slice.call(arguments);
            args = this.args.concat(args);
            (this.object[this.func]).apply(this.object, args);
        }
    });

    return Event;

});
