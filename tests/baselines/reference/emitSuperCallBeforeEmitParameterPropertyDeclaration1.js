//// [emitSuperCallBeforeEmitParameterPropertyDeclaration1.ts]
class A {
    blub = 6;
}


class B extends A {
    constructor(public x: number) {
        "use strict";
        'someStringForEgngInject';
        super()
    }
}


//// [emitSuperCallBeforeEmitParameterPropertyDeclaration1.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
        this.blub = 6;
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B(x) {
        "use strict";
        'someStringForEgngInject';
        var _this = _super.call(this) || this;
        _this.x = x;
        return _this;
    }
    return B;
}(A));
