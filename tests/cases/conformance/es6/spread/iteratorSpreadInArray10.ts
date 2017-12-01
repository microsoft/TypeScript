//@target: ES6
class SymbolIterator {
    [Symbol.iterator]() {
        return this;
    }
}

var array = [...new SymbolIterator];