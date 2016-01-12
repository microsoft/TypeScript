//// [inheritSameNamePropertiesWithDifferentVisibility.ts]
class C {
    public x: number;
}

class C2 {
    private x: number;
}

interface A extends C, C2 { // error
    y: string;
}

//// [inheritSameNamePropertiesWithDifferentVisibility.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    return C2;
}());
