//// [tests/cases/compiler/systemModule11.ts] ////

//// [file1.ts]
export var x;
export function foo() {}
export * from 'bar';

//// [file2.ts]
var x;
var y;
export {x};
export {y as y1}

export * from 'bar';

//// [file3.ts]
export {x, y as z} from 'a';
export default function foo() {}
export * from 'bar';

//// [file4.ts]
export var x;
export function foo() {}
export default function (){}

var z, z1;
export {z, z1 as z2};

export {s, s1 as s2} from 'a'

//// [file5.ts]
function foo() {}
export * from 'a';

//// [file1.js]
System.register(["bar"], function (exports_1, context_1) {
    "use strict";
    var x;
    var __moduleName = context_1 && context_1.id;
    function foo() { }
    exports_1("foo", foo);
    var exportedNames_1 = {
        "x": true,
        "foo": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (bar_1_1) {
                exportStar_1(bar_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//// [file2.js]
System.register(["bar"], function (exports_1, context_1) {
    "use strict";
    var x, y;
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "x": true,
        "y1": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (bar_1_1) {
                exportStar_1(bar_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//// [file3.js]
System.register(["a", "bar"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() { }
    exports_1("default", foo);
    var exportedNames_1 = {
        "x": true,
        "z": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (a_1_1) {
                exports_1({
                    "x": a_1_1["x"],
                    "z": a_1_1["y"]
                });
            },
            function (bar_1_1) {
                exportStar_1(bar_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//// [file4.js]
System.register(["a"], function (exports_1, context_1) {
    "use strict";
    var x, z, z1;
    var __moduleName = context_1 && context_1.id;
    function foo() { }
    exports_1("foo", foo);
    function default_1() { }
    exports_1("default", default_1);
    return {
        setters: [
            function (a_1_1) {
                exports_1({
                    "s": a_1_1["s"],
                    "s2": a_1_1["s1"]
                });
            }
        ],
        execute: function () {
        }
    };
});
//// [file5.js]
System.register(["a"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() { }
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (a_1_1) {
                exportStar_1(a_1_1);
            }
        ],
        execute: function () {
        }
    };
});
