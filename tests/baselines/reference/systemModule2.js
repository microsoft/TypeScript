//// [systemModule2.ts]

var x = 1;
export = x;

//// [systemModule2.js]
System.register([], function(exports_1) {
    "use strict";
    var x;
    return {
        setters:[],
        execute: function() {
            x = 1;
        }
    }
});
