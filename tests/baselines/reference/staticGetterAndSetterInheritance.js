//// [staticGetterAndSetterInheritance.ts]

class A {
	static get foo(): any {
		return this;
	}
}

class B extends A{}

A.foo;
B.foo;

//// [staticGetterAndSetterInheritance.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    Object.defineProperty(A, "foo", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
A.foo;
B.foo;
