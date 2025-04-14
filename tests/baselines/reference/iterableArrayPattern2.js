//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern2.ts] ////

//// [iterableArrayPattern2.ts]
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

var [a, ...b] = new SymbolIterator;

//// [iterableArrayPattern2.js]
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
var [a, ...b] = new SymbolIterator;
