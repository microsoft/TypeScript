//@target: ES6
var array = [...new SymbolIterator];

class SymbolIterator {
    [Symbol.iterator]() {
        return this;
    }
}