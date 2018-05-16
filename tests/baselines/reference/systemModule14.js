//// [systemModule14.ts]
function foo() {
    return a;
}

import {a} from "foo";
export {foo}

var x = 1;
export {foo as b}

//// [systemModule14.js]
System.register(["foo"], function (exports_1, context_1) {
    var foo_1, x;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() {
        return foo_1.a;
    }
    exports_1("foo", foo);
    exports_1("b", foo);
    return {
        setters: [
            function (foo_1_1) {
                foo_1 = foo_1_1;
            }
        ],
        execute: function () {
            x = 1;
        }
    };
});
