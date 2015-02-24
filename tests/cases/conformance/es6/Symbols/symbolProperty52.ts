//@target: ES6
var obj = {
    [Symbol.nonsense]: 0
};

obj = {};

obj[Symbol.nonsense];