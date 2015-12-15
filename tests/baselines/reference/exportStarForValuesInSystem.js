//// [tests/cases/compiler/exportStarForValuesInSystem.ts] ////

//// [file1.ts]

export interface Foo { x }

//// [file2.ts]
export * from "file1"
var x = 1;

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
            x = 1;
        }
    }
});
