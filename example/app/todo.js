define([
    "require", 
    "./listView", 
    "./listItem", 
    "./dropGroup", 
    "callback", 
    "klass", 
], 
function(
    require, 
    ListView, 
    ListItem, 
    DropGroup,
    Callback,
    Klass
) {

    var Todo = Klass({
        initialize: function(document,models) {
            this.document = document;
            this.dropGroup = new DropGroup();
            this.user = models["user"];
            this.lists = {};
            this.createElements();
            this.createEvents();
        },

        createElements: function() {
            if(!this.container) {
                this.container = this.document.createElement("div");

                var todo = new ListView("Todo", "todo", this.document);
                var inprogress = new ListView("In Progress", "inprogress", this.document);
                var done = new ListView("Done", "done", this.document);
                done.addDropAccept(inprogress);

                this.dropGroup.addDropArea(todo);
                this.dropGroup.addDropArea(inprogress);
                this.dropGroup.addDropArea(done);
                 
                var body = this.document.body;
                body.append(this.container);
                this.container.append(
                    todo.createElements(),
                    inprogress.createElements(),                
                    done.createElements()
                );

                this.lists["todo"] = todo;
                this.lists["inprogress"] = inprogress;
                this.lists["done"] = done;
            }
            return this.container;
        },

        createEvents: function() {
            //this.lists["todo"].createEvents();
            //this.lists["inprogress"].createEvents();
            //this.lists["done"].createEvents();

            var listItem = this.newTask({title:"Test"});
            this.lists["todo"].addItem(listItem);

            this.user.getListItems(new Callback(this, this.addItems, []));
        },


        update:function(data) {
        },

        newTask: function(item) {
            var listItem = new ListItem(item.title, this.document, this.dropGroup);
            this.dropGroup.addDropItem(listItem);
            listItem.setDropArea(this.todo);
            listItem.createEvents();
            return listItem;
        },

        addItems: function(items) {
            for(var i=0; i<items.length; i++) {
                var item = this.newTask(items[i]);
                this.lists[items[i].list].addItem(item);
                item.addChangeListener(new Callback(this, this.updateItem, []));
            }
        },

        updateItem: function(item, list) {
            this.user.updateListItem(item,list);
        }

    });

    return Todo;

});
