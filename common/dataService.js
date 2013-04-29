define(["require", "klass"], function(require, Klass) {

    var DataService = Klass({
        ajax:function(ajaxId, method, callback) {

            var xhr = new XMLHttpRequest(); 
            xhr.onreadystatechange = function() { if (xhr.readyState === 4) { callback.execute(JSON.parse(xhr.responseText)); } }; 
            xhr.open('GET', '/data/'+ ajaxId + '/' + method, true); 
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
            xhr.send();

        }
    });
    return DataService;
});
