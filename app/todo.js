define(["require", "module", "./listView", "./listItem", "./dropGroup"], 
       function(require, module, ListView, ListItem, DropGroup) {

    var Todo = function(document) {
        this.document = document;
        this.dropGroup = new DropGroup();
    };

    Todo.prototype = {

        createElements: function() {
            if(!this.container) {
                this.container = this.document.createElement("div");

                this.todo = new ListView("Todo", this.document);
                this.inprogress = new ListView("In Progress", this.document);
                this.done = new ListView("Done", this.document);
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

        newTask: function() {
            var listItem = new ListItem("Test Item", this.document, this.dropGroup);
            this.dropGroup.addDropItem(listItem);
            this.todo.addItem(listItem);
            listItem.setDropArea(this.todo);
            listItem.createEvents();
        },

        createEvents: function() {
            this.todo.createEvents();
            this.inprogress.createEvents();
            this.done.createEvents();
            this.newTask();
        },

        getModule: function() {
            return module.id;
        }
    };

    return Todo;

});
