define([ "require","module" ], function(require,module) {
    var Klass = function(parent, object) {
        if(!parent.prototype) {
            object = parent;
            parent = {};
        }
        var constructor = object.initialize;
        var serialize = object.serialize;
        var serialized = false;
        if(!constructor) {
            constructor = function(){};
        }
        delete object.initialize;

        var pseudoParent = function(){};
        pseudoParent.prototype = parent.prototype;

        constructor.prototype = new pseudoParent();
        for(var prop in object) {
            if(object.hasOwnProperty(prop)) {
                constructor.prototype[prop] = object[prop];
            }
        }
        constructor.prototype.__KLASS__ = true;

        constructor.prototype._parent = function() {
            var obj = this;
            var pseudoParent = function() {
                parent.apply(obj, arguments);
            }


            for(var funName in parent.protoype) {
                var fun = parent.prototype[funName];
                if(!!(fun && fun.constructor && fun.call && fun.apply)) {
                    pseudoParent[funName] = function() {
                        pseudoParent[funName].apply(obj, arguments);
                    }
                }
            }

            return pseudoParent;
        };

        //if(serialize) {
            //constructor.prototype.serialize = function(serialHelper) {
                //return serialize.apply(object, serialHelper);

            //};
        //}

        return constructor;
    };
    return Klass;
});

