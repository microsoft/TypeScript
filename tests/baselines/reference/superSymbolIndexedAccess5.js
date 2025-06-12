//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess5.ts] ////

//// [superSymbolIndexedAccess5.ts]
var symbol: any;

class Foo {
    [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    [symbol]() {
        return super[symbol]();
    }
}

//// [superSymbolIndexedAccess5.js]
var symbol;
class Foo {
    [symbol]() {
        return 0;
    }
}
class Bar extends Foo {
    [symbol]() {
        return super[symbol]();
    }
}
