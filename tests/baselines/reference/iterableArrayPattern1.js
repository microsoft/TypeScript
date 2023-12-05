//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern1.ts] ////

//// [iterableArrayPattern1.ts]
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

var [a, b] = new SymbolIterator;

//// [iterableArrayPattern1.js]
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
var [a, b] = new SymbolIterator;
