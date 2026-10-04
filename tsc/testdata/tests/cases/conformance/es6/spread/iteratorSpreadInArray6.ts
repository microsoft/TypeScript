//@target: ES6
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

var array: number[] = [0, 1];
array.concat([...new SymbolIterator]);