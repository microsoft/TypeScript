//// [tests/cases/compiler/functionTypeArgumentArrayAssignment.ts] ////

//// [functionTypeArgumentArrayAssignment.ts]
namespace test {
    interface Array<T> {
        foo: T;
        length: number;
    }

    function map<U>() {
        var ys: U[] = [];
    }
}


//// [functionTypeArgumentArrayAssignment.js]
var test;
(function (test) {
    function map() {
        var ys = [];
    }
})(test || (test = {}));
