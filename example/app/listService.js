define(["require", "klass", "dataService", "mongodb"], function(require, Klass, DataService, mongodb) {

    var ListService = Klass(DataService, {
        initialize: function(dataManager) {
            this._storage = dataManager.getStorage();
        },

        getListItems: function(userid, callback) {

            //var client = new mongodb.Db('test', new mongodb.Server("127.0.0.1", 27017, {}), {w: 1})
            var list = this._storage[userid];
            callback.execute(list);
        },

        addListItem: function(userid, itemTitle, list) {
            var list = this._storage[userid];
            list.push({
                title:itemTitle,
                list:list,
            });
        },

        updateItem: function(userid, itemTitle, list, callback) {
            var items = this._storage[userid];
            for(var i=0; i<items.length; i++) {
                if(items[i].title == itemTitle) {
                    items[i].list = list;
                }
            }
        }

    });

    return ListService;
});

