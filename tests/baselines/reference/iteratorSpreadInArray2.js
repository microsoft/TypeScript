//// [iteratorSpreadInArray2.ts]
class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}

class NumberIterator {
    next() {
        return {
            value: 0,
            done: false
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}

var array = [...new NumberIterator, ...new SymbolIterator];


//// [iteratorSpreadInArray2.js]
class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
class NumberIterator {
    next() {
        return {
            value: 0,
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
var array = [...new NumberIterator, ...new SymbolIterator];
