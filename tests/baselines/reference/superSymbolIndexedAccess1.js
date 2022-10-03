//// [superSymbolIndexedAccess1.ts]
var symbol = Symbol.for('myThing');

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

//// [superSymbolIndexedAccess1.js]
var symbol = Symbol.for('myThing');
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
