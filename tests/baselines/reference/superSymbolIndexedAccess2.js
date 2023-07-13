//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess2.ts] ////

//// [superSymbolIndexedAccess2.ts]
class Foo {
    [Symbol.isConcatSpreadable]() {
        return 0;
    }
}

class Bar extends Foo {
    [Symbol.isConcatSpreadable]() {
        return super[Symbol.isConcatSpreadable]();
    }
}

//// [superSymbolIndexedAccess2.js]
class Foo {
    [Symbol.isConcatSpreadable]() {
        return 0;
    }
}
class Bar extends Foo {
    [Symbol.isConcatSpreadable]() {
        return super[Symbol.isConcatSpreadable]();
    }
}
