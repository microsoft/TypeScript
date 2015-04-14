//// [iteratorSpreadInArray3.ts]
var array = [...[0, 1], ...new SymbolIterator];

class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}

//// [iteratorSpreadInArray3.js]
var array = [...[0, 1], ...new SymbolIterator];
class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
