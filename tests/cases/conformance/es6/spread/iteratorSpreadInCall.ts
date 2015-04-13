//@target: ES6
foo(...new SymbolIterator);

function foo(s: symbol) { }
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