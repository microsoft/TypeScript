//// [tests/cases/conformance/es6/spread/iteratorSpreadInArray5.ts] ////

//// [iteratorSpreadInArray5.ts]
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

var array: number[] = [0, 1, ...new SymbolIterator];

//// [iteratorSpreadInArray5.js]
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
