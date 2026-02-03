//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypesOfTypeParameterWithConstraints.ts] ////

//// [subtypesOfTypeParameterWithConstraints.ts]
// checking whether other types are subtypes of type parameters with constraints

class C3<T> {
    foo: T;
}

class D1<T extends U, U> extends C3<T> {
    [x: string]: T;
    foo: T; // ok
}

class D2<T extends U, U> extends C3<U> {
    [x: string]: U;
    foo: T; // ok
}

class D3<T extends U, U> extends C3<T> {
    [x: string]: T;
    foo: U; // error
}

class D4<T extends U, U> extends C3<U> {
    [x: string]: U;
    foo: U; // ok
}


// V > U > T
// test if T is subtype of T, U, V
// should all work
class D5<T extends U, U extends V, V> extends C3<T> {
    [x: string]: T;
    foo: T; // ok
}

class D6<T extends U, U extends V, V> extends C3<U> {
    [x: string]: U;
    foo: T;
}

class D7<T extends U, U extends V, V> extends C3<V> {
    [x: string]: V;
    foo: T; // ok
}

// test if U is a subtype of T, U, V
// only a subtype of V and itself
class D8<T extends U, U extends V, V> extends C3<T> {
    [x: string]: T;
    foo: U; // error
}

class D9<T extends U, U extends V, V> extends C3<U> {
    [x: string]: U;
    foo: U; // ok
}

class D10<T extends U, U extends V, V> extends C3<V> {
    [x: string]: V;
    foo: U; // ok
}

// test if V is a subtype of T, U, V
// only a subtype of itself
class D11<T extends U, U extends V, V> extends C3<T> {
    [x: string]: T;
    foo: V; // error
}

class D12<T extends U, U extends V, V> extends C3<U> {
    [x: string]: U;
    foo: V; // error
}

class D13<T extends U, U extends V, V> extends C3<V> {
    [x: string]: V;
    foo: V; // ok
}

// Date > V > U > T
// test if T is subtype of T, U, V, Date
// should all work
class D14<T extends U, U extends V, V extends Date> extends C3<Date> {
    [x: string]: Date;
    foo: T; // ok
}

class D15<T extends U, U extends V, V extends Date> extends C3<T> {
    [x: string]: T;
    foo: T; // ok
}

class D16<T extends U, U extends V, V extends Date> extends C3<U> {
    [x: string]: U;
    foo: T;
}

class D17<T extends U, U extends V, V extends Date> extends C3<V> {
    [x: string]: V;
    foo: T;
}

// test if U is a subtype of T, U, V, Date
// only a subtype of V, Date and itself
class D18<T extends U, U extends V, V extends Date> extends C3<Date> {
    [x: string]: Date;
    foo: T; // ok
}

class D19<T extends U, U extends V, V extends Date> extends C3<T> {
    [x: string]: T;
    foo: U; // error
}

class D20<T extends U, U extends V, V extends Date> extends C3<U> {
    [x: string]: U;
    foo: U; // ok
}

class D21<T extends U, U extends V, V extends Date> extends C3<V> {
    [x: string]: V;
    foo: U;
}

// test if V is a subtype of T, U, V, Date
// only a subtype of itself and Date
class D22<T extends U, U extends V, V extends Date> extends C3<Date> {
    [x: string]: Date;
    foo: T; // ok
}

class D23<T extends U, U extends V, V extends Date> extends C3<T> {
    [x: string]: T;
    foo: V; // error
}

class D24<T extends U, U extends V, V extends Date> extends C3<U> {
    [x: string]: U;
    foo: V; // error
}

class D25<T extends U, U extends V, V extends Date> extends C3<V> {
    [x: string]: V;
    foo: V; // ok
}

// test if Date is a subtype of T, U, V, Date
// only a subtype of itself
class D26<T extends U, U extends V, V extends Date> extends C3<Date> {
    [x: string]: Date;
    foo: Date; // ok
}

class D27<T extends U, U extends V, V extends Date> extends C3<T> {
    [x: string]: T;
    foo: Date; // error
}

class D28<T extends U, U extends V, V extends Date> extends C3<U> {
    [x: string]: U;
    foo: Date; // error
}

class D29<T extends U, U extends V, V extends Date> extends C3<V> {
    [x: string]: V;
    foo: Date; // error
}

//// [subtypesOfTypeParameterWithConstraints.js]
// checking whether other types are subtypes of type parameters with constraints
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
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var D1 = /** @class */ (function (_super) {
    __extends(D1, _super);
    function D1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D1;
}(C3));
var D2 = /** @class */ (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2;
}(C3));
var D3 = /** @class */ (function (_super) {
    __extends(D3, _super);
    function D3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D3;
}(C3));
var D4 = /** @class */ (function (_super) {
    __extends(D4, _super);
    function D4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D4;
}(C3));
// V > U > T
// test if T is subtype of T, U, V
// should all work
var D5 = /** @class */ (function (_super) {
    __extends(D5, _super);
    function D5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D5;
}(C3));
var D6 = /** @class */ (function (_super) {
    __extends(D6, _super);
    function D6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D6;
}(C3));
var D7 = /** @class */ (function (_super) {
    __extends(D7, _super);
    function D7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D7;
}(C3));
// test if U is a subtype of T, U, V
// only a subtype of V and itself
var D8 = /** @class */ (function (_super) {
    __extends(D8, _super);
    function D8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D8;
}(C3));
var D9 = /** @class */ (function (_super) {
    __extends(D9, _super);
    function D9() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D9;
}(C3));
var D10 = /** @class */ (function (_super) {
    __extends(D10, _super);
    function D10() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D10;
}(C3));
// test if V is a subtype of T, U, V
// only a subtype of itself
var D11 = /** @class */ (function (_super) {
    __extends(D11, _super);
    function D11() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D11;
}(C3));
var D12 = /** @class */ (function (_super) {
    __extends(D12, _super);
    function D12() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D12;
}(C3));
var D13 = /** @class */ (function (_super) {
    __extends(D13, _super);
    function D13() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D13;
}(C3));
// Date > V > U > T
// test if T is subtype of T, U, V, Date
// should all work
var D14 = /** @class */ (function (_super) {
    __extends(D14, _super);
    function D14() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D14;
}(C3));
var D15 = /** @class */ (function (_super) {
    __extends(D15, _super);
    function D15() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D15;
}(C3));
var D16 = /** @class */ (function (_super) {
    __extends(D16, _super);
    function D16() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D16;
}(C3));
var D17 = /** @class */ (function (_super) {
    __extends(D17, _super);
    function D17() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D17;
}(C3));
// test if U is a subtype of T, U, V, Date
// only a subtype of V, Date and itself
var D18 = /** @class */ (function (_super) {
    __extends(D18, _super);
    function D18() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D18;
}(C3));
var D19 = /** @class */ (function (_super) {
    __extends(D19, _super);
    function D19() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D19;
}(C3));
var D20 = /** @class */ (function (_super) {
    __extends(D20, _super);
    function D20() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D20;
}(C3));
var D21 = /** @class */ (function (_super) {
    __extends(D21, _super);
    function D21() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D21;
}(C3));
// test if V is a subtype of T, U, V, Date
// only a subtype of itself and Date
var D22 = /** @class */ (function (_super) {
    __extends(D22, _super);
    function D22() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D22;
}(C3));
var D23 = /** @class */ (function (_super) {
    __extends(D23, _super);
    function D23() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D23;
}(C3));
var D24 = /** @class */ (function (_super) {
    __extends(D24, _super);
    function D24() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D24;
}(C3));
var D25 = /** @class */ (function (_super) {
    __extends(D25, _super);
    function D25() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D25;
}(C3));
// test if Date is a subtype of T, U, V, Date
// only a subtype of itself
var D26 = /** @class */ (function (_super) {
    __extends(D26, _super);
    function D26() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D26;
}(C3));
var D27 = /** @class */ (function (_super) {
    __extends(D27, _super);
    function D27() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D27;
}(C3));
var D28 = /** @class */ (function (_super) {
    __extends(D28, _super);
    function D28() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D28;
}(C3));
var D29 = /** @class */ (function (_super) {
    __extends(D29, _super);
    function D29() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D29;
}(C3));
