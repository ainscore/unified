define([
    "require", 
    "module", 
    "./listView", 
    "./listItem", 
    "./dropGroup", 
    "./callback", 
], 
function(
    require, 
    module, 
    ListView, 
    ListItem, 
    DropGroup,
    Callback
) {

    var Todo = function(document,user) {
        this.document = document;
        this.dropGroup = new DropGroup();
        this.user = user;
        this.lists = {};
        this.createElements();
    };

    Todo.prototype = {

        createElements: function() {
            if(!this.container) {
                this.container = this.document.createElement("div");

                this.todo = new ListView("Todo", this.document);
                this.inprogress = new ListView("In Progress", this.document);
                this.done = new ListView("Done", this.document);
                this.lists["todo"] = this.todo;
                this.lists["inprogress"] = this.inprogress;
                this.lists["done"] = this.done;
                this.done.addDropAccept(this.inprogress);
                this.dropGroup.addDropArea(this.todo);
                this.dropGroup.addDropArea(this.inprogress);
                this.dropGroup.addDropArea(this.done);
                 
                var body = this.document.body;
                body.appendChild(this.container);
                this.container.appendChild(this.todo.createElements());
                this.container.appendChild(this.inprogress.createElements());
                this.container.appendChild(this.done.createElements());
            }
            return this.container;
        },

        update:function(data) {
        },

        newTask: function(item) {
            var listItem = new ListItem(item.title, this.document, this.dropGroup);
            this.dropGroup.addDropItem(listItem);
            //this.todo.addItem(listItem);
            listItem.setDropArea(this.todo);
            listItem.createEvents();
            return listItem;
        },

        createEvents: function() {
            this.todo.createEvents();
            this.inprogress.createEvents();
            this.done.createEvents();
            var listItem = this.newTask({title:"Test"});
            this.lists["todo"].addItem(listItem);
            var _this = this;

            this.user.getListItems(new Callback(this, this.addItems, []));
        },

        addItems: function(items) {
            var _this = this;
            for(var i=0; i<items.length; i++) {
                var item = _this.newTask(items[i]);
                _this.lists[items[i].list].addItem(item);
            }
        },

        getModule: function() {
            return module.id;
        }
    };

    return Todo;

});
