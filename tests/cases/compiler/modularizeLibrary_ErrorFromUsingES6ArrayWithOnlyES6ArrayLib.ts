// @lib: es2015.core
// @target: es5

// Error missing basic JavaScript objects
function f(x: number, y: number, z: number) {
    return Array.from(arguments);
}

f(1, 2, 3);
