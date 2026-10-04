// @target: es6
// @strict: true
const obj = {
    [Symbol.species]: Array
};

type Q = keyof typeof obj;
