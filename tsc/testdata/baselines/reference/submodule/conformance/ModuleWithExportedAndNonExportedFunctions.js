//// [tests/cases/conformance/internalModules/exportDeclarations/ModuleWithExportedAndNonExportedFunctions.ts] ////

//// [ModuleWithExportedAndNonExportedFunctions.ts]
module A {

    export function fn(s: string) {
        return true;
    }

    export function fng<T, U>(s: T): U {
        return null;
    }

    function fn2(s: string) {
        return false;
    }

    function fng2<T, U>(s: T): U {
        return null;
    }
}

// these should not be errors since the functions are exported
var fn: (s: string) => boolean;
var fn = A.fn;

var fng: <T, U>(s: T) => U;
var fng = A.fng; // bug 838015

// these should be errors since the functions are not exported
var fn2 = A.fn2;
var fng2 = A.fng2;

//// [ModuleWithExportedAndNonExportedFunctions.js]
var A;
(function (A) {
    function fn(s) {
        return true;
    }
    A.fn = fn;
    function fng(s) {
        return null;
    }
    A.fng = fng;
    function fn2(s) {
        return false;
    }
    function fng2(s) {
        return null;
    }
})(A || (A = {}));
// these should not be errors since the functions are exported
var fn;
var fn = A.fn;
var fng;
var fng = A.fng; // bug 838015
// these should be errors since the functions are not exported
var fn2 = A.fn2;
var fng2 = A.fng2;
