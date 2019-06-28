//// [for-of27.ts]
class StringIterator {
    [Symbol.iterator]: any;
}

for (var v of new StringIterator) { }

//// [for-of27.js]
class StringIterator {
}
for (var v of new StringIterator) { }
