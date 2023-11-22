//// [tests/cases/compiler/errorForUsingPropertyOfTypeAsType02.ts] ////

//// [errorForUsingPropertyOfTypeAsType02.ts]
namespace Test1 {
    function foo<T extends { abc: number }>(x: T) {
        let a: T.abc = x.abc;
    }
}

//// [errorForUsingPropertyOfTypeAsType02.js]
var Test1;
(function (Test1) {
    function foo(x) {
        var a = x.abc;
    }
})(Test1 || (Test1 = {}));
