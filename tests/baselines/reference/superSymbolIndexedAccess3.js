//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess3.ts] ////

//// [superSymbolIndexedAccess3.ts]
var symbol = Symbol.for('myThing');

class Foo {
    [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    [symbol]() {
        return super[Bar]();
    }
}

//// [superSymbolIndexedAccess3.js]
var symbol = Symbol.for('myThing');
class Foo {
    [symbol]() {
        return 0;
    }
}
class Bar extends Foo {
    [symbol]() {
        return super[Bar]();
    }
}
