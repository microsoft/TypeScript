//// [inheritSameNamePrivatePropertiesFromDifferentOrigins.ts]
class C {
    private x: number;
}

class C2 {
    private x: number;
}

interface A extends C, C2 { // error
    y: string;
}

//// [inheritSameNamePrivatePropertiesFromDifferentOrigins.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
