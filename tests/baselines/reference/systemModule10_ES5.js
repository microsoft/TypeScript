//// [systemModule10_ES5.ts]
import n, {x} from 'file1'
import n2 = require('file2');
export {x}
export {x as y}
export {n}
export {n as n1}
export {n2}
export {n2 as n3}

//// [systemModule10_ES5.js]
System.register(["file1", "file2"], function (exports_1, context_1) {
    var file1_1, n2;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (file1_1_1) {
                file1_1 = file1_1_1;
            },
            function (n2_1) {
                n2 = n2_1;
            }
        ],
        execute: function () {
            exports_1("n", file1_1.default);
            exports_1("n1", file1_1.default);
            exports_1("x", file1_1.x);
            exports_1("y", file1_1.x);
            exports_1("n2", n2);
            exports_1("n3", n2);
        }
    };
});
