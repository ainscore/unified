define(["require", "./element"], function(require, Element) {

    var StaticDocument = function() {
        this.elCount = 0;
        this.body = this.createElement("body");
        this.scripts = [];
    };

    StaticDocument.prototype = {
        createElement: function(tag) {
            this.elCount++;
            return new Element(tag, "dom_el_" + this.elCount, this);
        },
        addScript: function(src, content) {
            this.scripts.push({src:src, content:content});
        },
        getOutput: function(name) {
            var html = "<!doctype html>\n";
            html += "<html>\n";
            html += "<head>\n";
            for(var i=0; i<this.scripts.length; i++) {
                if(this.scripts[i].src) {
                    html += '<script src="'+this.scripts[i].src+'">\n';
                } else {
                    html += '<script>\n';
                    html += this.scripts[i].content;
                }
                html += "</script>\n";
            }
            html += "</head>\n";
            html +=  this.body.getHtml();
            html += "</html>";
            return html;
        },
        getModule: function() {
            return "app/browser_document";
        },
        serialize: function() {
            return "document";
        }
    };

    return StaticDocument;

});

