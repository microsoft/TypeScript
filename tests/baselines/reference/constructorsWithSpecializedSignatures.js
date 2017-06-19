//// [constructorsWithSpecializedSignatures.ts]
// errors
declare class C {
    constructor(x: "hi");
    constructor(x: "foo");
    constructor(x: number);
}

// ok
declare class C2 {
    constructor(x: "hi");
    constructor(x: "foo");
    constructor(x: string);
}

// errors
class D {
    constructor(x: "hi");
    constructor(x: "foo");
    constructor(x: number);
    constructor(x: "hi") { }
}

// overloads are ok
class D2 {
    constructor(x: "hi");
    constructor(x: "foo");
    constructor(x: string);
    constructor(x: "hi") { } // error
}

// errors
interface I {
    new (x: "hi");
    new (x: "foo");
    new (x: number);
}

// ok
interface I2 {
    new (x: "hi");
    new (x: "foo");
    new (x: string);
}

//// [constructorsWithSpecializedSignatures.js]
// errors
var D = /** @class */ (function () {
    function D(x) {
    }
    return D;
}());
// overloads are ok
var D2 = /** @class */ (function () {
    function D2(x) {
    } // error
    return D2;
}());
