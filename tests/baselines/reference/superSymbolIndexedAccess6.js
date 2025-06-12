//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess6.ts] ////

//// [superSymbolIndexedAccess6.ts]
var symbol: any;

class Foo {
    static [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    static [symbol]() {
        return super[symbol]();
    }
}

//// [superSymbolIndexedAccess6.js]
var symbol;
class Foo {
    static [symbol]() {
        return 0;
    }
}
class Bar extends Foo {
    static [symbol]() {
        return super[symbol]();
    }
}
