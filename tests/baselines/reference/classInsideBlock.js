//// [classInsideBlock.ts]
function foo() {
    class C { }
}

//// [classInsideBlock.js]
function foo() {
    var C = (function () {
        function C() {
        }
        return C;
    }());
}
