//// [classInsideBlock.ts]
function foo() {
    class C { }
}

//// [classInsideBlock.js]
function foo() {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
}
