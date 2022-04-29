// @target: es5
// @outFile: out.js
// @module: amd

// #15734 failed when test.ts comes before typings.d.ts
// @Filename: test.ts
namespace C {
    export class Name {
        static funcData = A.AA.func();
        static someConst = A.AA.foo;

        constructor(parameters) {}
    }
}

// @Filename: typings.d.ts
declare namespace A {
    namespace AA {
        function func(): number;
        const foo = "";
    }
}
