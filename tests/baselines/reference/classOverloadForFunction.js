//// [classOverloadForFunction.ts]
class foo { };
function foo() {}


//// [classOverloadForFunction.js]
var foo = (function () {
    function foo() {
    }
    return foo;
}());
;
function foo() { }
