//// [iteratorSpreadInArray6.ts]
var array: number[] = [0, 1];
array.concat([...new SymbolIterator]);

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

//// [iteratorSpreadInArray6.js]
var array = [0, 1];
array.concat([...new SymbolIterator]);
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
