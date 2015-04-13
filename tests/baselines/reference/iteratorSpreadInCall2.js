//// [iteratorSpreadInCall2.ts]
foo(...new SymbolIterator);

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

//// [iteratorSpreadInCall2.js]
foo(...new SymbolIterator);
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
