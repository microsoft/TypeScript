//// [conflictMarkerDiff3Trivia1.ts]
class C {
<<<<<<< HEAD
    v = 1;
||||||| merged common ancestors
    v = 3;
=======
    v = 2;
>>>>>>> Branch-a
}

//// [conflictMarkerDiff3Trivia1.js]
var C = /** @class */ (function () {
    function C() {
        this.v = 1;
    }
    return C;
}());
