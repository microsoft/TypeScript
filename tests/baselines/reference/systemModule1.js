//// [systemModule1.ts]

export var x = 1;

//// [systemModule1.js]
System.register([], function(exports_1) {
    "use strict";
    var x;
    return {
        setters:[],
        execute: function() {
            exports_1("x", x = 1);
        }
    }
});
