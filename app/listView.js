define(["require", "module", "./listItem"], function(require, module, ListItem) {

    var ListView = function(title, document) {
        this.document = document;
        this.title = title;
            this.dropAccepts = [];
    };

    ListView.prototype = {
        createElements:function() {
            if(!this.container) {
                var container = this.container = this.document.createElement("div");
                var header = this.document.createElement("div");
                this.list = this.document.createElement("ul");
                header.text(this.title);
                container.appendChild(header);
                container.appendChild(this.list);
                container.styles(ListView.CONTAINER_STYLE);
                this.list.styles(ListView.LIST_STYLE);
                header.styles(ListView.HEADER_STYLE);
                //this.listItem = new ListItem("Test Item", this.document);
                //list.appendChild(this.listItem.createElements());
            }

            return this.container;
        },
        createEvents:function() {
            //this.listItem.createEvents();
            //this.container.addEventListener("click", function() {
                //alert("text");
            //});
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
            this.list.appendChild(item.createElements());
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
        getModule: function() {
            return module.id;
        }
    };

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
