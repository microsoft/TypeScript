//@target: ES6
foo(...new SymbolIterator);

function foo<T>(s: T[]) { return s[0] }

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