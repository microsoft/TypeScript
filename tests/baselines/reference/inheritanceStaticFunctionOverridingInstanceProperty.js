//// [inheritanceStaticFunctionOverridingInstanceProperty.ts]
class a {
    x: string;
}

class b extends a {
    static x() {
        return new b().x;
    }
}

//// [inheritanceStaticFunctionOverridingInstanceProperty.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var a = (function () {
    function a() {
    }
    return a;
}());
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    b.x = function () {
        return new b().x;
    };
    return b;
}(a));
