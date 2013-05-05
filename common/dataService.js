define(["require", "klass"], function(require, Klass) {

    var DataService = Klass({
        ajax:function(ajaxId, method, args, callback) {

            var xhr = new XMLHttpRequest(); 
            xhr.onreadystatechange = function() { 
                if (xhr.readyState === 4) { 
                    if(xhr.responseText) {
                        callback.execute(JSON.parse(xhr.responseText)); 
                    }
                } 
            }; 
            var url = '/data/'+ ajaxId + '/' + method;
            url += "?args=" + args.join(",");

            xhr.open('GET', url, true); 
            xhr.setRequestHeader('Content-type', 'application/json'); 
            xhr.send();

        }
    });
    return DataService;
});
