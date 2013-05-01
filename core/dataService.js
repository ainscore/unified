define(["require", "klass", "module"], function(require, Klass, module) {

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
        //var ajaxId = dataManager.register(this.getModule());
        var output = "define(['dataService','require','klass'],function(DataService, require,Klass){\n";
        output += "return Klass(DataService, {";
        //output += "initialize:function(ajaxId) {";
        //output += "this.ajaxId = ajaxId;";
        //output += "},\n";
        for(var i in mod.prototype) {

           if(mod.hasOwnProperty(i)) continue;

            output += i + ":";
            output += "function() {\n";
            output += "var args = Array.prototype.slice.call(arguments);\n" 
            output += "var callback = args.pop();\n" 
            output += "callback.apply || args.push(callback);\n" 
            output += "this.ajax(";
            output += "this.ajaxId,";
            //output += "'" + ajaxId + "',";
            output += "'" + i + "',";
            output += "args,";
            output += "callback";
            output += ");\n";
            output += "},\n";
        }

        output += "});});";

        //serialHelper.write(output);
        return output;
    }

    return DataService;
});
