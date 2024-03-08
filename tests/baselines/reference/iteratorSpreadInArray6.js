//// [tests/cases/conformance/es6/spread/iteratorSpreadInArray6.ts] ////

//// [iteratorSpreadInArray6.ts]
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

var array: number[] = [0, 1];
array.concat([...new SymbolIterator]);

//// [iteratorSpreadInArray6.js]
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
var array = [0, 1];
array.concat([...new SymbolIterator]);
