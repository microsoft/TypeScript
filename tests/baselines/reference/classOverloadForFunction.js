//// [classOverloadForFunction.ts]
class foo { };
function foo() {}


//// [classOverloadForFunction.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}());
;
function foo() { }
