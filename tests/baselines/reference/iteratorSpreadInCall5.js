//// [iteratorSpreadInCall5.ts]
function foo(...s: (symbol | string)[]) { }
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

class StringIterator {
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

foo(...new SymbolIterator, ...new StringIterator);

//// [iteratorSpreadInCall5.js]
function foo(...s) { }
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
class StringIterator {
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
foo(...new SymbolIterator, ...new StringIterator);
