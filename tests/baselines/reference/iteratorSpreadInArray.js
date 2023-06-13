//// [tests/cases/conformance/es6/spread/iteratorSpreadInArray.ts] ////

//// [iteratorSpreadInArray.ts]
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

var array = [...new SymbolIterator];


//// [iteratorSpreadInArray.js]
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
var array = [...new SymbolIterator];
