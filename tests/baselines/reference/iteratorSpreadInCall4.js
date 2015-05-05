//// [iteratorSpreadInCall4.ts]
foo(...new SymbolIterator);

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

//// [iteratorSpreadInCall4.js]
foo(...new SymbolIterator);
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
