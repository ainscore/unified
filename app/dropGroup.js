define(["require", "module"], function(require, module) {

    var DropGroup = function() {
        this.dropAreas = [];
        this.dropItems = [];
    };

    DropGroup.prototype = {
        addDropArea: function(dropArea) {
            this.dropAreas.push(dropArea);
        },

        addDropItem: function(dropItem) {
            this.dropItems.push(dropItem);
        },

        getModule:function() {
            return module.id;
        },

        dropItem: function(item,x,y) {
            for(var i=0; i<this.dropAreas.length; i++) {
                if(this.dropAreas[i].inDropArea(x,y)) {
                    var currentArea = item.getDropArea();
                    var newArea = this.dropAreas[i];
                    var newAreaAccepts = newArea.getDropAccepts();
                    if(newAreaAccepts.length > 0) {
                        for(var j=0; j<newAreaAccepts.length; j++){
                            if(newAreaAccepts[j] === currentArea) {
                                newArea.addItem(item);
                                item.setDropArea(newArea);
                            }
                        }
                    } else {
                        newArea.addItem(item);
                        item.setDropArea(newArea);
                    }

                }
            }
        }
    };

    return DropGroup;

});

