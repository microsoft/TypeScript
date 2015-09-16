//// [tests/cases/compiler/jsFileCompilationEmitDeclarations.ts] ////

//// [a.ts]
class c {
}

//// [b.js]
function foo() {
}


//// [out.js]
var c = (function () {
    function c() {
    }
    return c;
})();


//// [out.d.ts]
declare class c {
}
