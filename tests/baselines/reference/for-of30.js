//// [tests/cases/conformance/es6/for-ofStatements/for-of30.ts] ////

//// [for-of30.ts]
class MyStringIterator {
    next() {
        return {
            done: false,
            value: ""
        }
    }

    return = 0;

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new MyStringIterator) { }

//// [for-of30.js]
class MyStringIterator {
    constructor() {
        this.return = 0;
    }
    next() {
        return {
            done: false,
            value: ""
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new MyStringIterator) { }
