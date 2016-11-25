//// [classExtendsInterfaceInModule.ts]
module M {
  export interface I1 {}
  export interface I2<T> {}
}
class C1 extends M.I1 {}
class C2<T> extends M.I2<T> {}

module Mod {
	export namespace Nested {
		export interface I {}
	}
}

class D extends Mod.Nested.I {}


//// [classExtendsInterfaceInModule.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C1 = (function (_super) {
    __extends(C1, _super);
    function C1() {
        return _super.apply(this, arguments) || this;
    }
    return C1;
}(M.I1));
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super.apply(this, arguments) || this;
    }
    return C2;
}(M.I2));
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return _super.apply(this, arguments) || this;
    }
    return D;
}(Mod.Nested.I));
