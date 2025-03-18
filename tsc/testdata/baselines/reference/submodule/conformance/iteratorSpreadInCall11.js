//// [tests/cases/conformance/es6/spread/iteratorSpreadInCall11.ts] ////

//// [iteratorSpreadInCall11.ts]
function foo<T>(...s: T[]) { return s[0] }
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

//// [iteratorSpreadInCall11.js]
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
foo(...new SymbolIterator);
