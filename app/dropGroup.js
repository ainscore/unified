define(["require", "klass"], function(require, Klass) {

    var DropGroup = Klass({
        initialize:function() {
            this.dropAreas = [];
            this.dropItems = [];
        },

        addDropArea: function(dropArea) {
            this.dropAreas.push(dropArea);
        },

        addDropItem: function(dropItem) {
            this.dropItems.push(dropItem);
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
    });

    return DropGroup;

});

