//// [systemModule14.ts]

function foo() {
    return a;
}

import {a} from "foo";
export {foo}

var x = 1;
export {foo as b}

//// [systemModule14.js]
System.register(["foo"], function(exports_1) {
    "use strict";
    var foo_1;
    var x;
    function foo() {
        return foo_1.a;
    }
    return {
        setters:[
            function (foo_1_1) {
                foo_1 = foo_1_1;
            }],
        execute: function() {
            exports_1("foo", foo);
            x = 1;
            exports_1("b", foo);
        }
    }
});
