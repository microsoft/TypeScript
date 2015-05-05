//// [iterableArrayPattern2.ts]
var [a, ...b] = new SymbolIterator;
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

//// [iterableArrayPattern2.js]
var [a, ...b] = new SymbolIterator;
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
