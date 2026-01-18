//// [tests/cases/conformance/interfaces/declarationMerging/twoInterfacesDifferentRootModule.ts] ////

//// [twoInterfacesDifferentRootModule.ts]
// two interfaces with different root modules should not merge

namespace M {
    export interface A {
        foo: string;
    }

    export interface B<T> {
        foo: T;
    }
}

namespace M2 {
    export interface A {
        bar: number;
    }

    declare var a: A;
    var r1 = a.foo; // error
    var r2 = a.bar; 

    export interface B<T> {
        bar: T;
    }

    declare var b: B<string>;
    var r3 = b.foo; // error
    var r4 = b.bar; 
}

//// [twoInterfacesDifferentRootModule.js]
// two interfaces with different root modules should not merge
var M2;
(function (M2) {
    var r1 = a.foo; // error
    var r2 = a.bar;
    var r3 = b.foo; // error
    var r4 = b.bar;
})(M2 || (M2 = {}));
