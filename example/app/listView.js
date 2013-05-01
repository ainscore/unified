define(["require", "./listItem", "klass"], function(require, ListItem, Klass) {

    var ListView = Klass({
        initialize: function(title, id, document) {
            this.document = document;
            this.title = title;
            this.id = id;
            this.dropAccepts = [];
            this.createElements();
        },
        createElements:function() {
            if(!this.container) {
                var container = this.container = this.document.createElement("div");
                var header = this.document.createElement("div");
                this.list = this.document.createElement("ul");
                header.text(this.title);
                container.append(header, this.list);
                container.styles(ListView.CONTAINER_STYLE);
                this.list.styles(ListView.LIST_STYLE);
                header.styles(ListView.HEADER_STYLE);
            }

            return this.container;
        },
        inDropArea:function(x,y) {
            var topRight = this.container.pageXY();
            var width = this.container.offsetWidth();
            var height = this.container.offsetHeight();
            if ((topRight.left) < x 
               && (topRight.left + width) > x
               && (topRight.top) < y
               && (topRight.top + height) > y
            ) {
                  return true;
            }
        },
        addItem:function(item) {
            this.list.append(item.createElements());
            item.setDropArea(this);
        },
        removeItem:function(item) {
            this.list.removeChild(item.createElements());
        },
        getDropAccepts:function() {
            return this.dropAccepts;
        },
        addDropAccept:function(dropArea) {
            this.dropAccepts.push(dropArea);
        },
        getId:function() {
            return this.id;
        }
    });

    ListView.LIST_STYLE = {
        "list-style-type": "none",
        "padding": 0,
        "margin": 0,
    }

    ListView.CONTAINER_STYLE = {
        "width": "300px",
        "height": "400px",
        "margin": "10px",
        "float": "left",
        "background-color": "red",
        "background-color": "black"
    };

    ListView.HEADER_STYLE = {
        "color": "white",
        "background-color": "gray",
        "padding": "10px"
    };

    return ListView;

});
