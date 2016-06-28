//// [superSymbolIndexedAccess4.ts]
var symbol = Symbol.for('myThing');

class Bar {
    [symbol]() {
        return super[symbol]();
    }
}

//// [superSymbolIndexedAccess4.js]
var symbol = Symbol.for('myThing');
class Bar {
    [symbol]() {
        return super[symbol]();
    }
}
