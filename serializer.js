define(["require", "underscore"], function(require, _) {
    return function(){
        var objectCache = {};
        var moduleCache = {};
        var objectId = 0;
        var classId = 0;
        function serialize(obj) {
            if(objectCache[obj.objectId]) {
                return "";
            }
            var queue = [];
            var objString = "obj_" + objectId;
            var output = "var " + objString + " = ";
            obj.objectId = objectId;
            objectCache[obj.objectId] = obj;
            objectId++;
            var objectDeps = "";
            if(obj instanceof Array) {
                output += "[";
                _.each(obj, function(prop, propName) {
                        if(propName === "objectId")
                            return;
                        if(prop instanceof Object) {
                            objectDeps += serialize(prop);
                            output += "obj_" + prop.objectId;
                        } else {
                            if(typeof prop === "string") {
                                output += "'";
                                output += prop;
                                output += "'";
                            } else {
                                output += prop;
                            }
                        }
                        output += ",";
                });
                output += "];";
            } else {
                if(obj.serialize) {
                    var result = output + obj.serialize() + ";";
                    result += "\n";
                    return result;
                }
                if(obj.getModule && !moduleCache[obj.getModule()]) {
                    moduleCache[obj.getModule()] = "class_" + classId++;
                }
                if(obj.getModule) {
                    output += "new " + moduleCache[obj.getModule()] + "();";
                    output += "\n";
                } else {
                    output += "{};";
                    output += "\n";
                }

                _.each(obj, function(prop, propName) {
                    if(propName === "objectId")
                        return;
                    output += objString + "." + propName + " = ";
                    if(prop instanceof Object) {
                        objectDeps += serialize(prop);
                        output += "obj_" + prop.objectId;
                    } else {
                        if(typeof prop === "string") {
                            output += "'";
                            output += prop;
                            output += "'";
                        } else {
                            output += prop;
                        }
                    }
                    output += ";\n";
                });
            }
            output += "\n";


            return objectDeps + output;
        }
        function serialize_parent(root) {
            var rec_output = serialize(root);
            var modules = _.map(moduleCache, function(obj_name, moduleName) {
                if(moduleName !== "objId") {
                    return "'" + moduleName + "'";
                }
                return null;
            });
            var moduleVars = _.map(moduleCache, function(obj_name, moduleName) {
                if(moduleName !== "objId") {
                    return obj_name;
                }
                return null;
            });
            modules.push("'app/browser_document'");
            modules.push("'app/browser_element'");
            moduleVars.push("Document");
            moduleVars.push("Element");
            var output = "require([";
            output += modules.join(",");
            output += "], function(";
            output += moduleVars.join(",");
            output += ") {\n";
            output += "var document = new Document(window.document);\n"
            for(var module in moduleCache) {
                if(module == "objId") continue;
                if(!moduleCache.hasOwnProperty(module)) continue;
                output += moduleCache[module]+".prototype.constructor = " + "function(){};\n";
            }
            output += rec_output;
            //output += "debugger;\n"
            //objectCache[obj.getObjectId()];
            output += "obj_" + root.objectId + ".createEvents();\n"
            output += "});\n"
            return output;

        }
        return {serialize:serialize_parent};
    }
});

