//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithPrivates3.ts] ////

//// [objectTypesIdentityWithPrivates3.ts]
interface T1 { }
interface T2 { z }

class C1<T> {
    private x;
}

class C2 extends C1<T1> {
    y;
}

var c1: C1<T2>;
<C2>c1; // Should succeed (private x originates in the same declaration)


class C3<T> {
    private x: T; // This T is the difference between C3 and C1
}

class C4 extends C3<T1> {
    y;
}

var c3: C3<T2>;
<C4>c3; // Should fail (private x originates in the same declaration, but different types)

//// [objectTypesIdentityWithPrivates3.js]
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
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(C1));
var c1;
c1; // Should succeed (private x originates in the same declaration)
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C4;
}(C3));
var c3;
c3; // Should fail (private x originates in the same declaration, but different types)
