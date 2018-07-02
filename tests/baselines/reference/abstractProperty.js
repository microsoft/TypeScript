//// [abstractProperty.ts]
interface A {
    prop: string;
    raw: string;
    m(): void;
}
abstract class B implements A {
    abstract prop: string;
    abstract raw: string;
    abstract readonly ro: string;
    abstract get readonlyProp(): string;
    abstract set readonlyProp(val: string);
    abstract m(): void;
}
class C extends B {
    get prop() { return "foo"; }
    set prop(v) { }
    raw = "edge";
    readonly ro = "readonly please";
    readonlyProp: string; // don't have to give a value, in fact
    m() { }
}

//// [abstractProperty.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.raw = "edge";
        _this.ro = "readonly please";
        return _this;
    }
    Object.defineProperty(C.prototype, "prop", {
        get: function () { return "foo"; },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    C.prototype.m = function () { };
    return C;
}(B));
