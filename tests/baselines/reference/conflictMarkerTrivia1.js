//// [conflictMarkerTrivia1.ts]
class C {
<<<<<<< HEAD
    v = 1;
=======
    v = 2;
>>>>>>> Branch-a
}

//// [conflictMarkerTrivia1.js]
var C = /** @class */ (function () {
    function C() {
        this.v = 1;
    }
    return C;
}());
