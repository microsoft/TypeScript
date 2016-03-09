// @lib: es5,es6.array
// @target: es5

// No error
function f(x: number, y: number, z: number) {
    return Array.from(arguments);
}

f(1, 2, 3);