//// [iteratorSpreadInArray9.ts]
var array = [...new SymbolIterator];

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

//// [iteratorSpreadInArray9.js]
var array = [...new SymbolIterator];
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
