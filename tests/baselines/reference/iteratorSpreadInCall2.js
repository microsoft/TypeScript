//// [iteratorSpreadInCall2.ts]
function foo(s: symbol[]) { }
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

//// [iteratorSpreadInCall2.js]
function foo(s) { }
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
