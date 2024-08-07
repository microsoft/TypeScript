//@target: ES6
class MyStringIterator {
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new MyStringIterator) { } // Should fail

for (v of new MyStringIterator) { } // Should still fail (related errors should still be shown even though type is cached).