//// [constructSignaturesWithOverloads2.ts]
// No errors expected for basic overloads of construct signatures with merged declarations

// clodules
class C {
    constructor(x: number, y?: string);
    constructor(x: number, y: string);
    constructor(x: number) { }
}
module C {
    export var x = 1;
}

var r1 = new C(1, '');

class C2<T> {
    constructor(x: T, y?: string);
    constructor(x: T, y: string);
    constructor(x: T) { }
}
module C2 {
    export var x = 1;
}

var r2 = new C2(1, '');

// merged interfaces
interface I {
    new (x: number, y?: string): C;
    new (x: number, y: string): C;
}

interface I<T> {
    new (x: T, y?: number): C2<T>;
    new (x: T, y: number): C2<T>;
}

var i2: I<number>;
var r4 = new i2(1, '');
var r5 = new i2(1, 1);

//// [constructSignaturesWithOverloads2.js]
// No errors expected for basic overloads of construct signatures with merged declarations
// clodules
var C = /** @class */ (function () {
    function C(x) {
    }
    return C;
}());
(function (C) {
    C.x = 1;
})(C || (C = {}));
var r1 = new C(1, '');
var C2 = /** @class */ (function () {
    function C2(x) {
    }
    return C2;
}());
(function (C2) {
    C2.x = 1;
})(C2 || (C2 = {}));
var r2 = new C2(1, '');
var i2;
var r4 = new i2(1, '');
var r5 = new i2(1, 1);
