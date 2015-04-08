//// [iteratorSpreadInArray10.ts]
var array = [...new SymbolIterator];

class SymbolIterator {
    [Symbol.iterator]() {
        return this;
    }
}

//// [iteratorSpreadInArray10.js]
var array = [...new SymbolIterator];
class SymbolIterator {
    [Symbol.iterator]() {
        return this;
    }
}
