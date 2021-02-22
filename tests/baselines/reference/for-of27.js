//// [for-of27.ts]
class StringIterator {
    [Symbol.iterator]: any;
}

for (var v of new StringIterator) { }

//// [for-of27.js]
class StringIterator {
}
Symbol.iterator;
for (var v of new StringIterator) { }
