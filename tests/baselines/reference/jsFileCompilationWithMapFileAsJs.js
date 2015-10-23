//// [tests/cases/compiler/jsFileCompilationWithMapFileAsJs.ts] ////

//// [a.ts]

class c {
}

//// [b.js.map]
function foo() {
}

//// [b.js]
function bar() {
}

//// [a.js]
var c = (function () {
    function c() {
    }
    return c;
})();
//# sourceMappingURL=a.js.map//// [b.js.js]
function foo() {
}
//# sourceMappingURL=b.js.js.map