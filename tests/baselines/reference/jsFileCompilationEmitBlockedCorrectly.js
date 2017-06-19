//// [tests/cases/compiler/jsFileCompilationEmitBlockedCorrectly.ts] ////

//// [a.ts]
class c {
}

//// [b.ts]
// this should be emitted
class d {
}

//// [a.js]
function foo() {
}


//// [b.js]
// this should be emitted
var d = /** @class */ (function () {
    function d() {
    }
    return d;
}());
