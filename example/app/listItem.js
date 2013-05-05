define(["require", "callback", "klass"], function(require, Callback, Klass) {

    var ListItem = Klass({
        initialize:function(title, document, dropGroup) {
            this.document = document;
            this.title = title;
            this.dropGroup = dropGroup;
            this.createElements();
            this.dragging = false;
            this._changeListeners = [];
        },

        createElements:function() {
            if(!this.container) {
                var container = this.container = this.document.createElement("li");
                container.styles(ListItem.DEFAULT_STYLE);
                container.text(this.title);
            }
            return this.container;
        },
        createEvents:function() {
            var active = false;
            this.document.addEventListener("selectstart", new Callback(this, this.selectStart));
            this.document.addEventListener("mousemove", new Callback(this, this.dragMove));
            this.container.on("mousedown", new Callback(this, this.startDrag));
            this.container.on("mouseup", new Callback(this, this.stopDrag));
        },
        selectStart: function(e) {
            e.preventDefault();
        },
        startDrag: function(e) {
            var width = this.container.offsetWidth() 
            - 2*parseInt(this.container.style("padding"));
            var elLoc = this.container.pageXY();
            this.moveXdiff = elLoc.left - e.pageX;
            this.moveYdiff = elLoc.top - e.pageY;
            var styles = {
                width:width + "px",
                position:"absolute",
                left:(e.pageX + this.moveXdiff ) + "px",
                top:(e.pageY + this.moveYdiff) + "px"
            };
            this.container.styles(styles);
            this.dragging = true;
        },
        stopDrag: function(e) {
            this.dragging = false;
            this.container.style("position", "static");
            this.dropGroup.dropItem(this, e.pageX, e.pageY);
        },
        dragMove: function(e) {
            if(!this.dragging)
                return;
            this.container.style("left", (e.pageX + this.moveXdiff) + "px");
            this.container.style("top", (e.pageY + this.moveYdiff) + "px");
        },
        getPageXY: function() {
            return this.container.pageXY();
        },
        getDropArea: function() {
            return this._dropArea;
        },
        setDropArea: function(dropArea, index) {
            this._dropArea = dropArea;
            for(var i=0; i<this._changeListeners.length; i++) {
                this._changeListeners[i].execute(this.title, dropArea.getId(), index);
            }

        },
        addChangeListener: function(callback) {
            this._changeListeners.push(callback);
        }

    });

    ListItem.DEFAULT_STYLE = {
        "padding": "10px",
        "background-color": "#CCC",
        "cursor": "pointer",
    };

    return ListItem;

});

