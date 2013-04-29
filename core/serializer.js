define(["require", "underscore"], function(require, _) {
    return function(){
        var objectCache = {};
        var moduleCache = {};
        var objectId = 0;
        var classId = 0;


        function serialize(obj, serialHelper) {
            if(objectCache[obj.objectId]) {
                return objectCache[obj.objectId];
            }
            var queue = [];
            var objString = "obj_" + objectId;
            var output = "var " + objString + " = ";
            obj.objectId = objectId;
            objectCache[obj.objectId] = objString;
            objectId++;
            if(obj instanceof Array) {
                output += "[";
                _.each(obj, function(prop, propName) {
                        if(propName === "objectId")
                            return;
                        if(prop instanceof Object) {
                            output += serialize(prop, serialHelper);
                            //output += "obj_" + prop.objectId;
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
                output += "];\n";
                serialHelper.write(output);
                return objString;
            } else {
                if(obj.getModule && !moduleCache[obj.getModule()]) {
                    moduleCache[obj.getModule()] = "class_" + classId++;
                }
                if(!obj.serialize) {

                    if(obj.getModule) {
                        output += "new " + moduleCache[obj.getModule()] + "();";
                        output += "\n";
                    } else {
                        output += "{};";
                        output += "\n";
                    }
                    serialHelper.write(output);
                    output = "";

                    _.each(obj, function(prop, propName) {
                        if(propName === "objectId")
                            return;
                        output += objString + "." + propName + " = ";
                        if(prop instanceof Object) {
                            output += serialize(prop, serialHelper);
                            //output += "obj_" + prop.objectId;
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

                    serialHelper.write(output);
                    return objString;
                } else {
                    var result = obj.serialize(serialHelper);
                    serialHelper.write(output);
                    serialHelper.write(result);
                    serialHelper.write(";\n");
                    return objString;
                }

            }
            return "FAILURE";


        }
        function serialize_parent(root, dataManager) {

            var objectDeps = "";
            var serialHelper = {
                dataManager:dataManager,

                moduleCache:moduleCache,

                write:function(value){
                    objectDeps += value;
                },

                serialize:serialize,

                classId:function() {
                    return classId++;
                },

                objString:function() {
                    return "obj_" + objectId++;
                },
            };

            var rec_output = serialize(root, serialHelper);
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
            modules.push("'document'");
            //modules.push("'app/browser_element'");
            moduleVars.push("Document");
            //moduleVars.push("Element");
            var output = "require([";
            output += modules.join(",");
            output += "], function(";
            output += moduleVars.join(",");
            output += ") {\n";
            output += "var document = new Document(window.document);\n"
            for(var module in moduleCache) {
                if(module == "objId") continue;
                if(!moduleCache.hasOwnProperty(module)) continue;
                output += "var oldProto = " + moduleCache[module]+".prototype;\n";
                output += moduleCache[module]+" = " + "function(){};\n";
                output += moduleCache[module]+".prototype = " + "oldProto;\n";
            }
            output += objectDeps;
            output += rec_output;
            //output += "debugger;\n"
            //objectCache[obj.getObjectId()];
            //output += "obj_" + root.objectId + ".createEvents();\n"
            output += "});\n"
            return output;

        }
        return {serialize:serialize_parent};
    }
});

