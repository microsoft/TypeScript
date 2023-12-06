//// [tests/cases/conformance/es6/spread/iteratorSpreadInArray10.ts] ////

//// [iteratorSpreadInArray10.ts]
class SymbolIterator {
    [Symbol.iterator]() {
        return this;
    }
}

var array = [...new SymbolIterator];

//// [iteratorSpreadInArray10.js]
class SymbolIterator {
    [Symbol.iterator]() {
        return this;
    }
}
var array = [...new SymbolIterator];
