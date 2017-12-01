//// [iteratorSpreadInCall7.ts]
function foo<T>(...s: T[]) { return s[0]; }
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

//// [iteratorSpreadInCall7.js]
function foo(...s) { return s[0]; }
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
