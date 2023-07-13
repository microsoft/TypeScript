//// [tests/cases/conformance/es6/spread/iteratorSpreadInArray4.ts] ////

//// [iteratorSpreadInArray4.ts]
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

var array = [0, 1, ...new SymbolIterator];

//// [iteratorSpreadInArray4.js]
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
var array = [0, 1, ...new SymbolIterator];
