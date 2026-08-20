//// [tests/cases/compiler/assignmentToFunction.ts] ////

//// [assignmentToFunction.ts]
function fn() { }
fn = () => 3;

namespace foo {
    function xyz() {
        function bar() {
        }
        bar = null;
    }
}

//// [assignmentToFunction.js]
"use strict";
function fn() { }
fn = () => 3;
var foo;
(function (foo) {
    function xyz() {
        function bar() {
        }
        bar = null;
    }
})(foo || (foo = {}));
