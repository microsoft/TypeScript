//// [classExpressionAssignment.ts]
interface A {
  prop: string;
}

// This is invalid
const A: {new(): A} = class {}


//// [classExpressionAssignment.js]
// This is invalid
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
