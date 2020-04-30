//// [staticAsIdentifier.ts]
class C {
    static static
    [x: string]: string;
}

class CC {
    static static;
}

//// [staticAsIdentifier.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var CC = /** @class */ (function () {
    function CC() {
    }
    return CC;
}());
