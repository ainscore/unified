define(["require", "module", "./klass", "./dataService"], function(require, module, Klass, DataService) {

    var ListService = Klass(DataService, {
        init: function(user) {
            this._user = user;
        },

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

    });

    return ListService;
});

