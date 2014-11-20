//// [selfReferencesInFunctionParameters.ts]
function foo(x: number = x) {
}

function bar(x0 = "", x: number = x) {
}

class C {
    constructor(x = 1, y = y) {
    }
     
    bar(a = "", b: string = b.toString()) {
    }
}

//// [selfReferencesInFunctionParameters.js]
function foo() {
    var x = (arguments[0] === void 0) ? x : arguments[0];
}
function bar() {
    var x0 = (arguments[0] === void 0) ? "" : arguments[0];
    var x = (arguments[1] === void 0) ? x : arguments[1];
}
var C = (function () {
    function C() {
        var x = (arguments[0] === void 0) ? 1 : arguments[0];
        var y = (arguments[1] === void 0) ? y : arguments[1];
    }
    C.prototype.bar = function () {
        var a = (arguments[0] === void 0) ? "" : arguments[0];
        var b = (arguments[1] === void 0) ? b.toString() : arguments[1];
    };
    return C;
})();
