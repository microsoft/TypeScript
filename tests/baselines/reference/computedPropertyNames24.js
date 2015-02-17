//// [computedPropertyNames24.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    // Gets emitted as super, not _super, which is consistent with
    // use of super in static properties initializers.
    [super.bar()]() { }
}

//// [computedPropertyNames24.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    Base.prototype.bar = function () {
        return 0;
    };
    return Base;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    // Gets emitted as super, not _super, which is consistent with
    // use of super in static properties initializers.
    C.prototype[super.bar.call(this)] = function () { };
    return C;
})(Base);
