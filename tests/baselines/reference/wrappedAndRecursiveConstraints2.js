//// [wrappedAndRecursiveConstraints2.ts]
class C<T extends C<T>> { // error
    constructor(x: T) { }
}

var c = new C(1);
var c = new C(new C('')); // error

//// [wrappedAndRecursiveConstraints2.js]
var C = /** @class */ (function () {
    function C(x) {
    }
    return C;
}());
var c = new C(1);
var c = new C(new C('')); // error
