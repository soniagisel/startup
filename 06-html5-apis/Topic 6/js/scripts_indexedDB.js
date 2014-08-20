//from http://www.codeproject.com/Articles/325135/Getting-Started-with-IndexedDB


var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

var db;

(function () {
    var messageData = [];


    function initDb() {

        var request = indexedDB.open("messageDB", 1);  

        request.onsuccess = function (evt) {
            db = request.result;                                                            
        };
     
        request.onerror = function (evt) {
            console.log("IndexedDB error: " + evt.target.errorCode);
        };
     
        request.onupgradeneeded = function (evt) {                   
            var objectStore = evt.currentTarget.result.createObjectStore("data", 
    			{ 
    				keyPath: "id", 
    				autoIncrement: true 
    			});
     
            objectStore.createIndex("textarea", "textarea", 
            	{ 
            		unique: false 
            	});

            objectStore.createIndex("id", "id", {
                unique : true
            });
     
            for (i in messageData) {
                objectStore.add(messageData[i]);
            }
        };
    }

    function contentLoaded() {

        initDb();      

        var submit = document.getElementById("submit");
        var Delete = document.getElementById("delete");
        submit.addEventListener('click', submitEl, false);
        Delete.addEventListener('click', deleteEl, false);           

        function submitEl () {
            var content = document.getElementById("textarea").value;
            var transaction = db.transaction("data", 'readwrite');
            var objectStore = transaction.objectStore("data");                    
            var request = objectStore.add({ content: content });

            request.onsuccess = function (evt) {
          		window.console.log("Data " + content + " added");
          		document.getElementById("textarea").value = "";
            };

            request.onerror = function () {
            	window.console.log("Could't add the data");
            };

        }

        function deleteEl () {

            db.close();

            var request = indexedDB.deleteDatabase('messageDB');
 
            request.onsuccess = function(evt) {  
                window.console.log("Data was deleted");
            };
             request.onerror = function () {
            	window.console.log("Could't delete the data");
            };
        }

    }

    window.addEventListener("DOMContentLoaded", contentLoaded, false); 

})();

