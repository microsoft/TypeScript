//// [systemModule1.ts]

export var x = 1;

//// [systemModule1.js]
System.register([], function(exports_1) {
    var x;
    return {
        setters:[],
        execute: function() {
            x = 1;
        }
    }
});
