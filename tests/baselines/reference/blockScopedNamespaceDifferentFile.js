//// [tests/cases/compiler/blockScopedNamespaceDifferentFile.ts] ////

//// [test.ts]
// #15734 failed when test.ts comes before typings.d.ts
namespace C {
    export class Name {
        static funcData = A.AA.func();
        static someConst = A.AA.foo;

        constructor(parameters) {}
    }
}

//// [typings.d.ts]
declare namespace A {
    namespace AA {
        function func(): number;
        const foo = "";
    }
}


//// [out.js]
// #15734 failed when test.ts comes before typings.d.ts
var C;
(function (C) {
    var Name = /** @class */ (function () {
        function Name(parameters) {
        }
        Name.funcData = A.AA.func();
        Name.someConst = A.AA.foo;
        return Name;
    }());
    C.Name = Name;
})(C || (C = {}));
