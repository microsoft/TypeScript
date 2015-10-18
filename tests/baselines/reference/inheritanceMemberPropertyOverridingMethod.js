//// [inheritanceMemberPropertyOverridingMethod.ts]
class a {
    x() {
        return "20";
    }
}

class b extends a {
    x: () => string;
}

//// [inheritanceMemberPropertyOverridingMethod.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var a = (function () {
    function a() {
    }
    a.prototype.x = function () {
        return "20";
    };
    return a;
})();
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    return b;
})(a);
