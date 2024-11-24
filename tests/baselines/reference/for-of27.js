//// [tests/cases/conformance/es6/for-ofStatements/for-of27.ts] ////

//// [for-of27.ts]
class MyStringIterator {
    [Symbol.iterator]: any;
}

for (var v of new MyStringIterator) { }

//// [for-of27.js]
class MyStringIterator {
}
Symbol.iterator;
for (var v of new MyStringIterator) { }
