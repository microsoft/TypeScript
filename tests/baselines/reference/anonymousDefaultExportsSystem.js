//// [tests/cases/conformance/es6/moduleExportsSystem/anonymousDefaultExportsSystem.ts] ////

//// [a.ts]
export default class {}

//// [b.ts]
export default function() {}

//// [a.js]
System.register([], function(exports_1) {
    "use strict";
    var default_1;
    return {
        setters:[],
        execute: function() {
            class default_1 {
            }
            exports_1("default", default_1);
        }
    }
});
//// [b.js]
System.register([], function(exports_1) {
    "use strict";
    function default_1() { }
    exports_1("default", default_1);
    return {
        setters:[],
        execute: function() {
        }
    }
});
