//// [constructorOverloads7.js]
// Type provided by extern declaration
// Because Point is a constructor function, this is inferred
// to be Point and return type is inferred to be void
function Point(x, y) {
    this.x = x;
    this.y = y;

    return this;
}

function EF1(a, b) {
    return a + b;
}
