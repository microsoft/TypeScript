//@target: ES6
var obj = {
    [Symbol.iterator]: 0
};

// Should give type 'any'.
obj[Symbol["nonsense"]];