//@target: ES6
class StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new StringIterator) { } // Should fail

for (v of new StringIterator) { } // Should still fail (related errors should still be shown even though type is cached).