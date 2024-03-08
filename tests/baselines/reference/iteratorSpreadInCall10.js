//// [tests/cases/conformance/es6/spread/iteratorSpreadInCall10.ts] ////

//// [iteratorSpreadInCall10.ts]
function foo<T>(s: T[]) { return s[0] }
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

//// [iteratorSpreadInCall10.js]
function foo(s) { return s[0]; }
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
