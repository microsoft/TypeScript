//@target: ES6
class Foo<T> {
    constructor(...s: T[]) { }
}

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

class _StringIterator {
    next() {
        return {
            value: "",
            done: false
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}

new Foo(...[...new SymbolIterator, ...[...new _StringIterator]]);