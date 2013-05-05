define(["require", "klass", "./listService"], 
       function(require, Klass, ListService) {

    var User = Klass({

        initialize: function(userId, listService) {
            this._listService = listService;
            this._userId = userId;
        },

        getListItems: function(callback) {
            //return this._listService.getListItems(this._userId, callback);
            return this._listService.getListItems(this._userId, callback);
        },

        updateListItem: function(itemTitle, list, index) {
            return this._listService.updateItem(this._userId, itemTitle, list, index);
        }

    });

    return User;

});

