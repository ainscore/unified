define(["require", "module"], function(require, module) {

    var ListService = function(user) {
        this._user = user;
    };
    ListService.prototype = {
        getListItems: function(callback) {
            var list = [
                {
                    title:"Go to work",
                    list:"todo"
                },
                {
                    title:"Get a Job",
                    list:"inprogress"
                },
            ];
            callback.execute(list);
        },

        getModuleId: function() {
            return module.id;
        },

        serialize: function(dataManager) {
            var ajaxId = dataManager.register(this.getModuleId());
            var output = "{";
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
                if(this.__proto__.__proto__ && this.__proto__.__proto__.serialize) {
                    output += this.__proto__.__proto__.serialize();
                }
            }
            output += "ajax:function(ajaxId, method, callback) {\n";

            output += "var xhr = new XMLHttpRequest(); xhr.onreadystatechange = function() { if (xhr.readyState === 4) { callback.execute(JSON.parse(xhr.responseText)); } }; xhr.open('GET', '/data/'+ ajaxId + '/' + method, true); xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); xhr.send();"

            output += "},\n";

            output += "}";
            return output;
        }
    }

    return ListService;
});

