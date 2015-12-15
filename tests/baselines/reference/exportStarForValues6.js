//// [tests/cases/compiler/exportStarForValues6.ts] ////

//// [file1.ts]

export interface Foo { x }

//// [file2.ts]
export * from "file1"
export var x = 1;

//// [file1.js]
System.register([], function(exports_1) {
    "use strict";
    return {
        setters:[],
        execute: function() {
        }
    }
});
//// [file2.js]
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
