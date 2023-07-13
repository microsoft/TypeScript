//// [tests/cases/conformance/es6/spread/iteratorSpreadInArray9.ts] ////

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
