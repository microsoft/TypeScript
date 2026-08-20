//@target: ES6
declare var iterableWithOptionalIterator: {
    [Symbol.iterator]?(): Iterator<string>
};

for (var v of iterableWithOptionalIterator) { }
