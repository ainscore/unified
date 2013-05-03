define(["require", "klass", "module", "underscore"], function(require, Klass, module, _) {

    var DataService = Klass({
        serialize: function(serialHelper) {
            var ajaxId = serialHelper.dataManager.register(this.getModule());
            var output = "";
            output += "function(){\n";
            output += "var a = ";
            output += "new " + serialHelper.moduleCache[this.getModule()];
            output += "();\n";
            output += "a.ajaxId=" + ajaxId + ";\n";
            output += "return a;\n";
            output += "}();";
            output += "\n";
            return output;
        }
    });

    DataService.serializeModule  = function(mod, dataManager) {

        var output = "define(['dataService','require','klass'],function(DataService, require,Klass){\n";
        output += "return Klass(DataService, {";

        _.each(_.functions(mod.prototype), function(funcName) {
            output += funcName + ":";
            output += "function() {\n";
            output += "var args = Array.prototype.slice.call(arguments);\n" 
            output += "var callback = args.pop();\n" 
            output += "callback.apply || args.push(callback);\n" 
            output += "this.ajax(";
            output += "this.ajaxId,";
            output += "'" + funcName + "',";
            output += "args,";
            output += "callback";
            output += ");\n";
            output += "},\n";

        });

        output += "});});";

        return output;
    }

    return DataService;
});
