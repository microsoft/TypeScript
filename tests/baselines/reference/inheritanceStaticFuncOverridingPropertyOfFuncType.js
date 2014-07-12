//// [inheritanceStaticFuncOverridingPropertyOfFuncType.ts]
class a {
    static x: () => string;
}

class b extends a {
    static x() {
        return "20";
    }
}

//// [inheritanceStaticFuncOverridingPropertyOfFuncType.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var a = (function () {
    function a() {
    }
    return a;
})();

var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    b.x = function () {
        return "20";
    };
    return b;
})(a);
