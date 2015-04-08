//// [iteratorSpreadInArray2.ts]
var array = [...new NumberIterator, ...new SymbolIterator];

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

//// [iteratorSpreadInArray2.js]
var array = [...new NumberIterator, ...new SymbolIterator];
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
