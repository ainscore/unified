define(["require", "module", "./listService"], function(require, module, ListService) {

    var User = function(userId, listService) {
        this._listService = listService;
        this._userId = userId;
    };

    User.prototype = {
        getListItems: function(callback) {
            //return this._listService.getListItems(this._userId, callback);
            return this._listService.getListItems(callback);
        },

        getModule: function() {
            return module.id;
        }
    };
    return User;

});

