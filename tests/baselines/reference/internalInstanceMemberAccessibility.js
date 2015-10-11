//// [tests/cases/conformance/classes/members/accessibility/internalInstanceMemberAccessibility.ts] ////

//// [internalInstanceMemberAccessibility_0.d.ts]
export declare class Base1 {
    internal foo(): string;
}

//// [internalInstanceMemberAccessibility_1.ts]
import { Base1 } from "./internalInstanceMemberAccessibility_0";

class Derived1 extends Base1 {
    x = super.foo(); // error
    y() {
        return super.foo(); // error
    }
}

declare class Base2 {
    internal foo(): string;
}

class Derived2 extends Base2 {
    x = super.foo(); // ok
    y() {
        return super.foo(); // ok
    }
}

//// [internalInstanceMemberAccessibility_1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./internalInstanceMemberAccessibility_0"], function (require, exports, internalInstanceMemberAccessibility_0_1) {
    var Derived1 = (function (_super) {
        __extends(Derived1, _super);
        function Derived1() {
            _super.apply(this, arguments);
            this.x = _super.prototype.foo.call(this); // error
        }
        Derived1.prototype.y = function () {
            return _super.prototype.foo.call(this); // error
        };
        return Derived1;
    })(internalInstanceMemberAccessibility_0_1.Base1);
    var Derived2 = (function (_super) {
        __extends(Derived2, _super);
        function Derived2() {
            _super.apply(this, arguments);
            this.x = _super.prototype.foo.call(this); // ok
        }
        Derived2.prototype.y = function () {
            return _super.prototype.foo.call(this); // ok
        };
        return Derived2;
    })(Base2);
});
