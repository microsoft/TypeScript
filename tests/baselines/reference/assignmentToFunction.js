//// [assignmentToFunction.ts]
function fn() { }
fn = () => 3;

module foo {
    function xyz() {
        function bar() {
        }
        bar = null;
    }
}

//// [assignmentToFunction.js]
function fn() { }
fn = function () { return 3; };
var foo;
(function (foo) {
    function xyz() {
        function bar() {
        }
        bar = null;
    }
})(foo || (foo = {}));
