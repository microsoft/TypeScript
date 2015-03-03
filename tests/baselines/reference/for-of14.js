//// [for-of14.ts]
var v: string;
for (v of new StringIterator) { } // Should fail because the iterator is not iterable

class StringIterator {
    next() {
        return "";
    }
}

//// [for-of14.js]
var v;
for (v of new StringIterator) { } // Should fail because the iterator is not iterable
var StringIterator = (function () {
    function StringIterator() {
    }
    StringIterator.prototype.next = function () {
        return "";
    };
    return StringIterator;
})();
