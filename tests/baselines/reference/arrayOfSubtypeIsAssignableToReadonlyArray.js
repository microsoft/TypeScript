//// [arrayOfSubtypeIsAssignableToReadonlyArray.ts]
class A { a }
class B extends A { b }
class C<T> extends Array<T> { c }
declare var ara: A[];
declare var arb: B[];
declare var cra: C<A>;
declare var crb: C<B>;
declare var rra: ReadonlyArray<A>;
declare var rrb: ReadonlyArray<B>;
rra = ara;
rrb = arb; // OK, Array<B> is assignable to ReadonlyArray<A>
rra = arb;
rrb = ara; // error: 'A' is not assignable to 'B'

rra = cra;
rra = crb; // OK, C<B> is assignable to ReadonlyArray<A>
rrb = crb;
rrb = cra; // error: 'A' is not assignable to 'B'


//// [arrayOfSubtypeIsAssignableToReadonlyArray.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(Array));
rra = ara;
rrb = arb; // OK, Array<B> is assignable to ReadonlyArray<A>
rra = arb;
rrb = ara; // error: 'A' is not assignable to 'B'
rra = cra;
rra = crb; // OK, C<B> is assignable to ReadonlyArray<A>
rrb = crb;
rrb = cra; // error: 'A' is not assignable to 'B'
