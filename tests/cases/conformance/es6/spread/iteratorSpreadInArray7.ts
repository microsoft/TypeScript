//@target: ES6
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