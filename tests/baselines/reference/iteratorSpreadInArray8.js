//// [iteratorSpreadInArray8.ts]
var array = [...new SymbolIterator];

class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }
}

//// [iteratorSpreadInArray8.js]
var array = [...new SymbolIterator];
class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }
}
