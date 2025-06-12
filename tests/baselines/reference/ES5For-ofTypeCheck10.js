//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck10.ts] ////

//// [ES5For-ofTypeCheck10.ts]
// In ES3/5, you cannot for...of over an arbitrary iterable.
class MyStringIterator {
    next() {
        return {
            done: true,
            value: ""
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new MyStringIterator) { }

//// [ES5For-ofTypeCheck10.js]
// In ES3/5, you cannot for...of over an arbitrary iterable.
class MyStringIterator {
    next() {
        return {
            done: true,
            value: ""
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new MyStringIterator) { }
