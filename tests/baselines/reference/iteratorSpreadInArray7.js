//// [tests/cases/conformance/es6/spread/iteratorSpreadInArray7.ts] ////

//// [iteratorSpreadInArray7.ts]
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

var array: symbol[];
array.concat([...new SymbolIterator]);

//// [iteratorSpreadInArray7.js]
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
var array;
array.concat([...new SymbolIterator]);
