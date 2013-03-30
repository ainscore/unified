define(["require", "module"], function(require, module) {

    var ListItem = function(title, document, dropGroup) {
        this.document = document;
        this.title = title;
        this.dropGroup = dropGroup;
    };

    ListItem.prototype = {
        createElements:function() {
            if(!this.container) {
                var container = this.container = this.document.createElement("li");
                container.styles(ListItem.DEFAULT_STYLE);
                container.text(this.title);
            }
            return this.container;
        },
        createEvents:function() {
            var _this = this;
            var active = false;
            var moveXdiff = 
            this.document.addEventListener("selectstart", function(e) {
                e.preventDefault();
            });
            this.container.addEventListener("mousedown", function(e) {
                var width = _this.container.offsetWidth() 
                    - 2*parseInt(_this.container.style("padding"));
                var elLoc = _this.container.pageXY();
                moveXdiff = elLoc.left - e.pageX;
                moveYdiff = elLoc.top - e.pageY;
                var styles = {
                    width:width + "px",
                    position:"absolute",
                    left:(e.pageX + moveXdiff ) + "px",
                    top:(e.pageY + moveYdiff) + "px"
                };
                _this.container.styles(styles);
                active = true;
            });
            this.document.addEventListener("mousemove", function(e) {
                if(!active)
                    return;
                var elLoc = _this.container.pageXY();
                _this.container.style("left", (e.pageX + moveXdiff) + "px");
                _this.container.style("top", (e.pageY + moveYdiff) + "px");
            });
            this.container.addEventListener("mouseup", function(e) {
                active = false;
                _this.container.style("position", "static");
                _this.dropGroup.dropItem(_this, e.pageX, e.pageY);
            });
        },
        getModule: function() {
            return module.id;
        },
        getPageXY: function() {
            return this.container.pageXY();
        },
        getDropArea: function() {
            return this._dropArea;
        },
        setDropArea: function(dropArea) {
            this._dropArea = dropArea;
        }

    };

    ListItem.DEFAULT_STYLE = {
        "padding": "10px",
        "background-color": "#CCC",
        "cursor": "pointer",
    };

    return ListItem;

});

