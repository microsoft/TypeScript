//// [tests/cases/compiler/superCallFromClassThatHasNoBaseType1.ts] ////

//// [superCallFromClassThatHasNoBaseType1.ts]
class A {
    constructor(private map: (value: number) => string) {

    }
}

class B {
    constructor() { super(value => String(value)); }
}

//// [superCallFromClassThatHasNoBaseType1.js]
var A = /** @class */ (function () {
    function A(map) {
        this.map = map;
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
        return _super.call(this, function (value) { return String(value); }) || this;
    }
    return B;
}());
