// @lib: es5,es2015.core
// @target: es5

// No error
function f(x: number, y: number, z: number) {
    return Array.from(arguments);
}

f(1, 2, 3);