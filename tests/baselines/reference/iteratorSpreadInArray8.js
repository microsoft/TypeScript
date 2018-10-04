//// [iteratorSpreadInArray8.ts]
class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }
}

var array = [...new SymbolIterator];

//// [iteratorSpreadInArray8.js]
class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }
}
var array = [...new SymbolIterator];
