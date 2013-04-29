define(["require", "module", "klass"], function(require, module, Klass) {

    var DataService = Klass({
        serialize: function(serialHelper) {
            //var objId = serialHelper.objString();
            var ajaxId = serialHelper.dataManager.register(this.getModule());
            //var output = "var " + objId + "=" + "{";
            var output = "{\n";
            for(var i in this.__proto__) {
                output += i + ":";
                output += "function(callback) {\n";
                output += "this.ajax(" 
                //output += "'" + this._user + "'" + ",";
                output += "'" + ajaxId + "',";
                output += "'" + i + "',";
                output += "callback";
                output += ");\n";
                output += "},\n";
                //if(this.__proto__.__proto__ && this.__proto__.__proto__.serialize) {
                    //output += this.__proto__.__proto__.serialize();
                //}
            }
            //output += "ajax:function(ajaxId, method, callback) {\n";

            //output += "var xhr = new XMLHttpRequest(); xhr.onreadystatechange = function() { if (xhr.readyState === 4) { callback.execute(JSON.parse(xhr.responseText)); } }; xhr.open('GET', '/data/'+ ajaxId + '/' + method, true); xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); xhr.send();"

            //output += "},\n";

            output += "};";

            //serialHelper.write(output);
            return output;
        }
    });
    return DataService;
});
