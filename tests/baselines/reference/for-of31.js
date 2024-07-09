//// [tests/cases/conformance/es6/for-ofStatements/for-of31.ts] ////

//// [for-of31.ts]
class StringIterator {
    next() {
        return {
            // no done property
            value: ""
        }
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new StringIterator) { }

//// [for-of31.js]
class StringIterator {
    next() {
        return {
            // no done property
            value: ""
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new StringIterator) { }
