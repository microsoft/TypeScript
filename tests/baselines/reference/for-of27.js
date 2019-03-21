//// [for-of27.ts]
class _StringIterator {
    [Symbol.iterator]: any;
}

for (var v of new _StringIterator) { }

//// [for-of27.js]
class _StringIterator {
}
for (var v of new _StringIterator) { }
