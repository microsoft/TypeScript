//@target: ES6
var obj = {
    [Symbol.iterator]: 0
};

namespace M {
    var Symbol: SymbolConstructor;
    // The following should be of type 'any'. This is because even though obj has a property keyed by Symbol.iterator,
    // the key passed in here is the *wrong* Symbol.iterator. It is not the iterator property of the global Symbol.
    obj[Symbol.iterator];
}