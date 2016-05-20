//// [readonlyConstructorAssignment.ts]
class A {
    constructor(readonly x: number) {
        this.x = 7;
    }
}


//// [readonlyConstructorAssignment.js]
var A = (function () {
    function A(x) {
        this.x = x;
        this.x = 7;
    }
    return A;
}());
