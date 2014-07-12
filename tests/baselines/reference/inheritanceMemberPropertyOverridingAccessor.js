//// [inheritanceMemberPropertyOverridingAccessor.ts]
class a {
    private __x: () => string;
    get x() {
        return this.__x;
    }
    set x(aValue: () => string) {
        this.__x = aValue;
    }
}

class b extends a {
    x: () => string;
}

//// [inheritanceMemberPropertyOverridingAccessor.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var a = (function () {
    function a() {
    }
    Object.defineProperty(a.prototype, "x", {
        get: function () {
            return this.__x;
        },
        set: function (aValue) {
            this.__x = aValue;
        },
        enumerable: true,
        configurable: true
    });
    return a;
})();

var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    return b;
})(a);
