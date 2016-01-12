//// [typesWithPrivateConstructor.ts]
// private constructors are not allowed

class C {
    private constructor() { }
}

var c = new C();
var r: () => void = c.constructor;

class C2 {
    private constructor(x: number);
    private constructor(x: any) { }
}

var c2 = new C2();
var r2: (x: number) => void = c2.constructor;

//// [typesWithPrivateConstructor.js]
// private constructors are not allowed
var C = (function () {
    function C() {
    }
    return C;
}());
var c = new C();
var r = c.constructor;
var C2 = (function () {
    function C2(x) {
    }
    return C2;
}());
var c2 = new C2();
var r2 = c2.constructor;
