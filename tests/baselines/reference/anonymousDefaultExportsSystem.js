//// [tests/cases/conformance/es6/moduleExportsSystem/anonymousDefaultExportsSystem.ts] ////

//// [a.ts]
export default class {}

//// [b.ts]
export default function() {}

//// [a.js]
System.register([], function (exports_1, context_1) {
    var default_1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            default_1 = class {
            };
            exports_1("default", default_1);
        }
    };
});
//// [b.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1() { }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
