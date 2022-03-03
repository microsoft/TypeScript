//// [comparisonOperatorWithNoRelationshipObjectsOnIndexSignature.ts]
class Base {
    public a: string;
}

class Derived extends Base {
    public b: string;
}

class C {
    public c: string;
}

var a1: { [a: string]: string };
var b1: { [b: string]: number };

var a2: { [index: string]: Base };
var b2: { [index: string]: C };

var a3: { [index: number]: Base };
var b3: { [index: number]: C };

var a4: { [index: number]: Derived };
var b4: { [index: string]: Base };

// operator <
var r1a1 = a1 < b1;
var r1a2 = a2 < b2;
var r1a3 = a3 < b3;
var r1a4 = a4 < b4;

var r1b1 = b1 < a1;
var r1b2 = b2 < a2;
var r1b3 = b3 < a3;
var r1b4 = b4 < a4;

// operator >
var r2a1 = a1 > b1;
var r2a2 = a2 > b2;
var r2a3 = a3 > b3;
var r2a4 = a4 > b4;

var r2b1 = b1 > a1;
var r2b2 = b2 > a2;
var r2b3 = b3 > a3;
var r2b4 = b4 > a4;

// operator <=
var r3a1 = a1 <= b1;
var r3a2 = a2 <= b2;
var r3a3 = a3 <= b3;
var r3a4 = a4 <= b4;

var r3b1 = b1 <= a1;
var r3b2 = b2 <= a2;
var r3b3 = b3 <= a3;
var r3b4 = b4 <= a4;

// operator >=
var r4a1 = a1 >= b1;
var r4a2 = a2 >= b2;
var r4a3 = a3 >= b3;
var r4a4 = a4 >= b4;

var r4b1 = b1 >= a1;
var r4b2 = b2 >= a2;
var r4b3 = b3 >= a3;
var r4b4 = b4 >= a4;

// operator ==
var r5a1 = a1 == b1;
var r5a2 = a2 == b2;
var r5a3 = a3 == b3;
var r5a4 = a4 == b4;

var r5b1 = b1 == a1;
var r5b2 = b2 == a2;
var r5b3 = b3 == a3;
var r5b4 = b4 == a4;

// operator !=
var r6a1 = a1 != b1;
var r6a2 = a2 != b2;
var r6a3 = a3 != b3;
var r6a4 = a4 != b4;

var r6b1 = b1 != a1;
var r6b2 = b2 != a2;
var r6b3 = b3 != a3;
var r6b4 = b4 != a4;

// operator ===
var r7a1 = a1 === b1;
var r7a2 = a2 === b2;
var r7a3 = a3 === b3;
var r7a4 = a4 === b4;

var r7b1 = b1 === a1;
var r7b2 = b2 === a2;
var r7b3 = b3 === a3;
var r7b4 = b4 === a4;

// operator !==
var r8a1 = a1 !== b1;
var r8a2 = a2 !== b2;
var r8a3 = a3 !== b3;
var r8a4 = a4 !== b4;

var r8b1 = b1 !== a1;
var r8b2 = b2 !== a2;
var r8b3 = b3 !== a3;
var r8b4 = b4 !== a4;

//// [comparisonOperatorWithNoRelationshipObjectsOnIndexSignature.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a1;
var b1;
var a2;
var b2;
var a3;
var b3;
var a4;
var b4;
// operator <
var r1a1 = a1 < b1;
var r1a2 = a2 < b2;
var r1a3 = a3 < b3;
var r1a4 = a4 < b4;
var r1b1 = b1 < a1;
var r1b2 = b2 < a2;
var r1b3 = b3 < a3;
var r1b4 = b4 < a4;
// operator >
var r2a1 = a1 > b1;
var r2a2 = a2 > b2;
var r2a3 = a3 > b3;
var r2a4 = a4 > b4;
var r2b1 = b1 > a1;
var r2b2 = b2 > a2;
var r2b3 = b3 > a3;
var r2b4 = b4 > a4;
// operator <=
var r3a1 = a1 <= b1;
var r3a2 = a2 <= b2;
var r3a3 = a3 <= b3;
var r3a4 = a4 <= b4;
var r3b1 = b1 <= a1;
var r3b2 = b2 <= a2;
var r3b3 = b3 <= a3;
var r3b4 = b4 <= a4;
// operator >=
var r4a1 = a1 >= b1;
var r4a2 = a2 >= b2;
var r4a3 = a3 >= b3;
var r4a4 = a4 >= b4;
var r4b1 = b1 >= a1;
var r4b2 = b2 >= a2;
var r4b3 = b3 >= a3;
var r4b4 = b4 >= a4;
// operator ==
var r5a1 = a1 == b1;
var r5a2 = a2 == b2;
var r5a3 = a3 == b3;
var r5a4 = a4 == b4;
var r5b1 = b1 == a1;
var r5b2 = b2 == a2;
var r5b3 = b3 == a3;
var r5b4 = b4 == a4;
// operator !=
var r6a1 = a1 != b1;
var r6a2 = a2 != b2;
var r6a3 = a3 != b3;
var r6a4 = a4 != b4;
var r6b1 = b1 != a1;
var r6b2 = b2 != a2;
var r6b3 = b3 != a3;
var r6b4 = b4 != a4;
// operator ===
var r7a1 = a1 === b1;
var r7a2 = a2 === b2;
var r7a3 = a3 === b3;
var r7a4 = a4 === b4;
var r7b1 = b1 === a1;
var r7b2 = b2 === a2;
var r7b3 = b3 === a3;
var r7b4 = b4 === a4;
// operator !==
var r8a1 = a1 !== b1;
var r8a2 = a2 !== b2;
var r8a3 = a3 !== b3;
var r8a4 = a4 !== b4;
var r8b1 = b1 !== a1;
var r8b2 = b2 !== a2;
var r8b3 = b3 !== a3;
var r8b4 = b4 !== a4;
