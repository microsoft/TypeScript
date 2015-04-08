//// [iteratorSpreadInArray7.ts]
var array: symbol[];
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

//// [iteratorSpreadInArray7.js]
var array;
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
