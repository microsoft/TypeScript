//// [iteratorSpreadInCall4.ts]
function foo(s1: symbol, ...s: symbol[]) { }
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

foo(...new SymbolIterator);

//// [iteratorSpreadInCall4.js]
function foo(s1, ...s) { }
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
foo(...new SymbolIterator);
