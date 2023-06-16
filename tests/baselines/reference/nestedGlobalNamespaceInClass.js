//// [tests/cases/compiler/nestedGlobalNamespaceInClass.ts] ////

//// [nestedGlobalNamespaceInClass.ts]
// should not crash - from #35717
class C {
    global x
}


//// [nestedGlobalNamespaceInClass.js]
// should not crash - from #35717
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var global;
(function (global) {
})(global || (global = {}));
x;
