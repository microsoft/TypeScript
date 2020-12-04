//// [comparisonOperatorWithSubtypeObjectOnCallSignature.ts]
class Base {
    public a: string;
}

class Derived extends Base {
    public b: string;
}

var a1: { fn(): void };
var b1: { fn(): void };

var a2: { fn(a: number, b: string): void };
var b2: { fn(a: number, b: string): void };

var a3: { fn(a: number, b: string): void };
var b3: { fn(a: number): void };

var a4: { fn(a: number, b: string): void };
var b4: { fn(): void };

var a5: { fn(a: Base): void };
var b5: { fn(a: Derived): void };

var a6: { fn(a: Derived, b: Base): void };
var b6: { fn(a: Base, b: Derived): void };

var a7: { fn(): void };
var b7: { fn(): Base };

var a8: { fn(): Base };
var b8: { fn(): Base };

var a9: { fn(): Base };
var b9: { fn(): Derived };

var a10: { fn(a?: Base): void };
var b10: { fn(a?: Derived): void };

var a11: { fn(...a: Base[]): void };
var b11: { fn(...a: Derived[]): void };

//var a12: { fn<T, U extends T>(t: T, u: U): T[] };
//var b12: { fn<A, B extends A>(a: A, b: B): A[] };

// operator <
var r1a1 = a1 < b1;
var r1a2 = a2 < b2;
var r1a3 = a3 < b3;
var r1a4 = a4 < b4;
var r1a5 = a5 < b5;
var r1a6 = a6 < b6;
var r1a7 = a7 < b7;
var r1a8 = a8 < b8;
var r1a9 = a9 < b9;
var r1a10 = a10 < b10;
var r1a11 = a11 < b11;
//var r1a12 = a12 < b12;

var r1b1 = b1 < a1;
var r1b2 = b2 < a2;
var r1b3 = b3 < a3;
var r1b4 = b4 < a4;
var r1b5 = b5 < a5;
var r1b6 = b6 < a6;
var r1b7 = b7 < a7;
var r1b8 = b8 < a8;
var r1b9 = b9 < a9;
var r1b10 = b10 < a10;
var r1b11 = b11 < a11;
//var r1b12 = b12 < a12;

// operator >
var r2a1 = a1 > b1;
var r2a2 = a2 > b2;
var r2a3 = a3 > b3;
var r2a4 = a4 > b4;
var r2a5 = a5 > b5;
var r2a6 = a6 > b6;
var r2a7 = a7 > b7;
var r2a8 = a8 > b8;
var r2a9 = a9 > b9;
var r2a10 = a10 > b10;
var r2a11 = a11 > b11;
//var r2a12 = a12 > b12;

var r2b1 = b1 > a1;
var r2b2 = b2 > a2;
var r2b3 = b3 > a3;
var r2b4 = b4 > a4;
var r2b5 = b5 > a5;
var r2b6 = b6 > a6;
var r2b7 = b7 > a7;
var r2b8 = b8 > a8;
var r2b9 = b9 > a9;
var r2b10 = b10 > a10;
var r2b11 = b11 > a11;
//var r2b12 = b12 > a12;

// operator <=
var r3a1 = a1 <= b1;
var r3a2 = a2 <= b2;
var r3a3 = a3 <= b3;
var r3a4 = a4 <= b4;
var r3a5 = a5 <= b5;
var r3a6 = a6 <= b6;
var r3a7 = a7 <= b7;
var r3a8 = a8 <= b8;
var r3a9 = a9 <= b9;
var r3a10 = a10 <= b10;
var r3a11 = a11 <= b11;
//var r3a12 = a12 <= b12;

var r3b1 = b1 <= a1;
var r3b2 = b2 <= a2;
var r3b3 = b3 <= a3;
var r3b4 = b4 <= a4;
var r3b5 = b5 <= a5;
var r3b6 = b6 <= a6;
var r3b7 = b7 <= a7;
var r3b8 = b8 <= a8;
var r3b9 = b9 <= a9;
var r3b10 = b10 <= a10;
var r3b11 = b11 <= a11;
//var r3b12 = b12 <= a12;

// operator >=
var r4a1 = a1 >= b1;
var r4a2 = a2 >= b2;
var r4a3 = a3 >= b3;
var r4a4 = a4 >= b4;
var r4a5 = a5 >= b5;
var r4a6 = a6 >= b6;
var r4a7 = a7 >= b7;
var r4a8 = a8 >= b8;
var r4a9 = a9 >= b9;
var r4a10 = a10 >= b10;
var r4a11 = a11 >= b11;
//var r4a12 = a12 >= b12;

var r4b1 = b1 >= a1;
var r4b2 = b2 >= a2;
var r4b3 = b3 >= a3;
var r4b4 = b4 >= a4;
var r4b5 = b5 >= a5;
var r4b6 = b6 >= a6;
var r4b7 = b7 >= a7;
var r4b8 = b8 >= a8;
var r4b9 = b9 >= a9;
var r4b10 = b10 >= a10;
var r4b11 = b11 >= a11;
//var r4b12 = b12 >= a12;

// operator ==
var r5a1 = a1 == b1;
var r5a2 = a2 == b2;
var r5a3 = a3 == b3;
var r5a4 = a4 == b4;
var r5a5 = a5 == b5;
var r5a6 = a6 == b6;
var r5a7 = a7 == b7;
var r5a8 = a8 == b8;
var r5a9 = a9 == b9;
var r5a10 = a10 == b10;
var r5a11 = a11 == b11;
//var r5a12 = a12 == b12;

var r5b1 = b1 == a1;
var r5b2 = b2 == a2;
var r5b3 = b3 == a3;
var r5b4 = b4 == a4;
var r5b5 = b5 == a5;
var r5b6 = b6 == a6;
var r5b7 = b7 == a7;
var r5b8 = b8 == a8;
var r5b9 = b9 == a9;
var r5b10 = b10 == a10;
var r5b11 = b11 == a11;
//var r5b12 = b12 == a12;

// operator !=
var r6a1 = a1 != b1;
var r6a2 = a2 != b2;
var r6a3 = a3 != b3;
var r6a4 = a4 != b4;
var r6a5 = a5 != b5;
var r6a6 = a6 != b6;
var r6a7 = a7 != b7;
var r6a8 = a8 != b8;
var r6a9 = a9 != b9;
var r6a10 = a10 != b10;
var r6a11 = a11 != b11;
//var r6a12 = a12 != b12;

var r6b1 = b1 != a1;
var r6b2 = b2 != a2;
var r6b3 = b3 != a3;
var r6b4 = b4 != a4;
var r6b5 = b5 != a5;
var r6b6 = b6 != a6;
var r6b7 = b7 != a7;
var r6b8 = b8 != a8;
var r6b9 = b9 != a9;
var r6b10 = b10 != a10;
var r6b11 = b11 != a11;
//var r6b12 = b12 != a12;

// operator ===
var r7a1 = a1 === b1;
var r7a2 = a2 === b2;
var r7a3 = a3 === b3;
var r7a4 = a4 === b4;
var r7a5 = a5 === b5;
var r7a6 = a6 === b6;
var r7a7 = a7 === b7;
var r7a8 = a8 === b8;
var r7a9 = a9 === b9;
var r7a10 = a10 === b10;
var r7a11 = a11 === b11;
//var r7a12 = a12 === b12;

var r7b1 = b1 === a1;
var r7b2 = b2 === a2;
var r7b3 = b3 === a3;
var r7b4 = b4 === a4;
var r7b5 = b5 === a5;
var r7b6 = b6 === a6;
var r7b7 = b7 === a7;
var r7b8 = b8 === a8;
var r7b9 = b9 === a9;
var r7b10 = b10 === a10;
var r7b11 = b11 === a11;
//var r7b12 = b12 === a12;

// operator !==
var r8a1 = a1 !== b1;
var r8a2 = a2 !== b2;
var r8a3 = a3 !== b3;
var r8a4 = a4 !== b4;
var r8a5 = a5 !== b5;
var r8a6 = a6 !== b6;
var r8a7 = a7 !== b7;
var r8a8 = a8 !== b8;
var r8a9 = a9 !== b9;
var r8a10 = a10 !== b10;
var r8a11 = a11 !== b11;
//var r8a12 = a12 !== b12;

var r8b1 = b1 !== a1;
var r8b2 = b2 !== a2;
var r8b3 = b3 !== a3;
var r8b4 = b4 !== a4;
var r8b5 = b5 !== a5;
var r8b6 = b6 !== a6;
var r8b7 = b7 !== a7;
var r8b8 = b8 !== a8;
var r8b9 = b9 !== a9;
var r8b10 = b10 !== a10;
var r8b11 = b11 !== a11;
//var r8b12 = b12 !== a12;

//// [comparisonOperatorWithSubtypeObjectOnCallSignature.js]
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
var a1;
var b1;
var a2;
var b2;
var a3;
var b3;
var a4;
var b4;
var a5;
var b5;
var a6;
var b6;
var a7;
var b7;
var a8;
var b8;
var a9;
var b9;
var a10;
var b10;
var a11;
var b11;
//var a12: { fn<T, U extends T>(t: T, u: U): T[] };
//var b12: { fn<A, B extends A>(a: A, b: B): A[] };
// operator <
var r1a1 = a1 < b1;
var r1a2 = a2 < b2;
var r1a3 = a3 < b3;
var r1a4 = a4 < b4;
var r1a5 = a5 < b5;
var r1a6 = a6 < b6;
var r1a7 = a7 < b7;
var r1a8 = a8 < b8;
var r1a9 = a9 < b9;
var r1a10 = a10 < b10;
var r1a11 = a11 < b11;
//var r1a12 = a12 < b12;
var r1b1 = b1 < a1;
var r1b2 = b2 < a2;
var r1b3 = b3 < a3;
var r1b4 = b4 < a4;
var r1b5 = b5 < a5;
var r1b6 = b6 < a6;
var r1b7 = b7 < a7;
var r1b8 = b8 < a8;
var r1b9 = b9 < a9;
var r1b10 = b10 < a10;
var r1b11 = b11 < a11;
//var r1b12 = b12 < a12;
// operator >
var r2a1 = a1 > b1;
var r2a2 = a2 > b2;
var r2a3 = a3 > b3;
var r2a4 = a4 > b4;
var r2a5 = a5 > b5;
var r2a6 = a6 > b6;
var r2a7 = a7 > b7;
var r2a8 = a8 > b8;
var r2a9 = a9 > b9;
var r2a10 = a10 > b10;
var r2a11 = a11 > b11;
//var r2a12 = a12 > b12;
var r2b1 = b1 > a1;
var r2b2 = b2 > a2;
var r2b3 = b3 > a3;
var r2b4 = b4 > a4;
var r2b5 = b5 > a5;
var r2b6 = b6 > a6;
var r2b7 = b7 > a7;
var r2b8 = b8 > a8;
var r2b9 = b9 > a9;
var r2b10 = b10 > a10;
var r2b11 = b11 > a11;
//var r2b12 = b12 > a12;
// operator <=
var r3a1 = a1 <= b1;
var r3a2 = a2 <= b2;
var r3a3 = a3 <= b3;
var r3a4 = a4 <= b4;
var r3a5 = a5 <= b5;
var r3a6 = a6 <= b6;
var r3a7 = a7 <= b7;
var r3a8 = a8 <= b8;
var r3a9 = a9 <= b9;
var r3a10 = a10 <= b10;
var r3a11 = a11 <= b11;
//var r3a12 = a12 <= b12;
var r3b1 = b1 <= a1;
var r3b2 = b2 <= a2;
var r3b3 = b3 <= a3;
var r3b4 = b4 <= a4;
var r3b5 = b5 <= a5;
var r3b6 = b6 <= a6;
var r3b7 = b7 <= a7;
var r3b8 = b8 <= a8;
var r3b9 = b9 <= a9;
var r3b10 = b10 <= a10;
var r3b11 = b11 <= a11;
//var r3b12 = b12 <= a12;
// operator >=
var r4a1 = a1 >= b1;
var r4a2 = a2 >= b2;
var r4a3 = a3 >= b3;
var r4a4 = a4 >= b4;
var r4a5 = a5 >= b5;
var r4a6 = a6 >= b6;
var r4a7 = a7 >= b7;
var r4a8 = a8 >= b8;
var r4a9 = a9 >= b9;
var r4a10 = a10 >= b10;
var r4a11 = a11 >= b11;
//var r4a12 = a12 >= b12;
var r4b1 = b1 >= a1;
var r4b2 = b2 >= a2;
var r4b3 = b3 >= a3;
var r4b4 = b4 >= a4;
var r4b5 = b5 >= a5;
var r4b6 = b6 >= a6;
var r4b7 = b7 >= a7;
var r4b8 = b8 >= a8;
var r4b9 = b9 >= a9;
var r4b10 = b10 >= a10;
var r4b11 = b11 >= a11;
//var r4b12 = b12 >= a12;
// operator ==
var r5a1 = a1 == b1;
var r5a2 = a2 == b2;
var r5a3 = a3 == b3;
var r5a4 = a4 == b4;
var r5a5 = a5 == b5;
var r5a6 = a6 == b6;
var r5a7 = a7 == b7;
var r5a8 = a8 == b8;
var r5a9 = a9 == b9;
var r5a10 = a10 == b10;
var r5a11 = a11 == b11;
//var r5a12 = a12 == b12;
var r5b1 = b1 == a1;
var r5b2 = b2 == a2;
var r5b3 = b3 == a3;
var r5b4 = b4 == a4;
var r5b5 = b5 == a5;
var r5b6 = b6 == a6;
var r5b7 = b7 == a7;
var r5b8 = b8 == a8;
var r5b9 = b9 == a9;
var r5b10 = b10 == a10;
var r5b11 = b11 == a11;
//var r5b12 = b12 == a12;
// operator !=
var r6a1 = a1 != b1;
var r6a2 = a2 != b2;
var r6a3 = a3 != b3;
var r6a4 = a4 != b4;
var r6a5 = a5 != b5;
var r6a6 = a6 != b6;
var r6a7 = a7 != b7;
var r6a8 = a8 != b8;
var r6a9 = a9 != b9;
var r6a10 = a10 != b10;
var r6a11 = a11 != b11;
//var r6a12 = a12 != b12;
var r6b1 = b1 != a1;
var r6b2 = b2 != a2;
var r6b3 = b3 != a3;
var r6b4 = b4 != a4;
var r6b5 = b5 != a5;
var r6b6 = b6 != a6;
var r6b7 = b7 != a7;
var r6b8 = b8 != a8;
var r6b9 = b9 != a9;
var r6b10 = b10 != a10;
var r6b11 = b11 != a11;
//var r6b12 = b12 != a12;
// operator ===
var r7a1 = a1 === b1;
var r7a2 = a2 === b2;
var r7a3 = a3 === b3;
var r7a4 = a4 === b4;
var r7a5 = a5 === b5;
var r7a6 = a6 === b6;
var r7a7 = a7 === b7;
var r7a8 = a8 === b8;
var r7a9 = a9 === b9;
var r7a10 = a10 === b10;
var r7a11 = a11 === b11;
//var r7a12 = a12 === b12;
var r7b1 = b1 === a1;
var r7b2 = b2 === a2;
var r7b3 = b3 === a3;
var r7b4 = b4 === a4;
var r7b5 = b5 === a5;
var r7b6 = b6 === a6;
var r7b7 = b7 === a7;
var r7b8 = b8 === a8;
var r7b9 = b9 === a9;
var r7b10 = b10 === a10;
var r7b11 = b11 === a11;
//var r7b12 = b12 === a12;
// operator !==
var r8a1 = a1 !== b1;
var r8a2 = a2 !== b2;
var r8a3 = a3 !== b3;
var r8a4 = a4 !== b4;
var r8a5 = a5 !== b5;
var r8a6 = a6 !== b6;
var r8a7 = a7 !== b7;
var r8a8 = a8 !== b8;
var r8a9 = a9 !== b9;
var r8a10 = a10 !== b10;
var r8a11 = a11 !== b11;
//var r8a12 = a12 !== b12;
var r8b1 = b1 !== a1;
var r8b2 = b2 !== a2;
var r8b3 = b3 !== a3;
var r8b4 = b4 !== a4;
var r8b5 = b5 !== a5;
var r8b6 = b6 !== a6;
var r8b7 = b7 !== a7;
var r8b8 = b8 !== a8;
var r8b9 = b9 !== a9;
var r8b10 = b10 !== a10;
var r8b11 = b11 !== a11;
//var r8b12 = b12 !== a12;
