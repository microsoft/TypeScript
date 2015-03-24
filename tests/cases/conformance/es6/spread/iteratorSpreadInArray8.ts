//@target: ES6
var array = [...new SymbolIterator];

class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }
}