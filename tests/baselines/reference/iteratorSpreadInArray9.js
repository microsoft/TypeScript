//// [iteratorSpreadInArray9.ts]
class SymbolIterator {
    next() {
        return {
            value: Symbol()
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}

var array = [...new SymbolIterator];

//// [iteratorSpreadInArray9.js]
class SymbolIterator {
    next() {
        return {
            value: Symbol()
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
var array = [...new SymbolIterator];
