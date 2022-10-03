//// [arrayAssignmentTest3.ts]
// The following gives no error
// Michal saw no error if he used number instead of B, 
// but I do...
class B {}

class a {
    constructor(public x: string, public y: number, z: B[]) { }
}



var xx = new a(null, 7, new B());



//// [arrayAssignmentTest3.js]
// The following gives no error
// Michal saw no error if he used number instead of B, 
// but I do...
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var a = /** @class */ (function () {
    function a(x, y, z) {
        this.x = x;
        this.y = y;
    }
    return a;
}());
var xx = new a(null, 7, new B());
