define(["require"], function(require) {

    var ListClient = function(server) {
        this.server = server;
    };

    ListClient.prototype = {
        init: function() {
        },
        getItems: function(userId, listType) {
            this.server.getItems(userId, listType);
        },
        getModule: function() {
            return "listClient";
        }
    };

    return Todo;

});
