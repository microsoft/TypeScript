//@target: ES6
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