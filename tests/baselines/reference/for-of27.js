//// [for-of27.ts]
for (var v of new StringIterator) { }

class StringIterator {
    [Symbol.iterator]: any;
}

//// [for-of27.js]
for (var v of new StringIterator) { }
var StringIterator = (function () {
    function StringIterator() {
    }
    return StringIterator;
})();
