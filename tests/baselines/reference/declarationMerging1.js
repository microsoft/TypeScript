//// [tests/cases/compiler/declarationMerging1.ts] ////

//// [file1.ts]
class A {
    protected _f: number;
    getF() { return this._f; }
}

//// [file2.ts]
interface A {
    run();
}

//// [file1.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.getF = function () { return this._f; };
    return A;
}());
//// [file2.js]
