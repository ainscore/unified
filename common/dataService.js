define(["require", "klass"], function(require, Klass) {

    var DataService = Klass({
        ajax:function(ajaxId, method, args, callback) {
            //TODO: Add args

            var xhr = new XMLHttpRequest(); 
            xhr.onreadystatechange = function() { if (xhr.readyState === 4) { callback.execute(JSON.parse(xhr.responseText)); } }; 
            var url = '/data/'+ ajaxId + '/' + method;
            url += "?args=" + args.join(",");
            xhr.open('GET', url, true); 
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
            xhr.send();

        }
    });
    return DataService;
});
