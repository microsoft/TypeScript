//// [tests/cases/conformance/interfaces/declarationMerging/twoMergedInterfacesWithDifferingOverloads2.ts] ////

//// [twoMergedInterfacesWithDifferingOverloads2.ts]
interface A {
    (): string;
    (x: number): number;
}

interface A {
    (x: number, y: number): boolean;
}

var a: A;
var r = a();
var r2 = a(1);
var r3 = a(1, 2);

module G {
    interface A<T> {
        (): string;
        (x: T): T;
    }

    interface A<T> {
        (x: T, y: number): T;
        <U>(x: U, y: T): U;
    }

    var a: A<boolean>;
    var r = a();
    var r2 = a(true);
    var r3 = a(true, 2);
    var r4 = a(1, true);
}

//// [twoMergedInterfacesWithDifferingOverloads2.js]
var a;
var r = a();
var r2 = a(1);
var r3 = a(1, 2);
var G;
(function (G) {
    var a;
    var r = a();
    var r2 = a(true);
    var r3 = a(true, 2);
    var r4 = a(1, true);
})(G || (G = {}));
