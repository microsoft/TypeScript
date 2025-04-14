//// [tests/cases/conformance/es6/for-ofStatements/for-of29.ts] ////

//// [for-of29.ts]
var iterableWithOptionalIterator: {
    [Symbol.iterator]?(): Iterator<string>
};

for (var v of iterableWithOptionalIterator) { }


//// [for-of29.js]
var iterableWithOptionalIterator;
for (var v of iterableWithOptionalIterator) { }
