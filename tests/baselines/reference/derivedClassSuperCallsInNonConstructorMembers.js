//// [derivedClassSuperCallsInNonConstructorMembers.ts]
// error to use super calls outside a constructor

class Base {
    x: string;
}

class Derived extends Base {
    a: super();
    b() {
        super();
    }
    get C() {
        super();
        return 1;
    }
    set C(v) {
        super();
    }

    static a: super();
    static b() {
        super();
    }
    static get C() {
        super();
        return 1;
    }
    static set C(v) {
        super();
    }
}

//// [derivedClassSuperCallsInNonConstructorMembers.js]
// error to use super calls outside a constructor
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
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
();
b();
{
    _this = _super.call(this) || this;
}
get;
C();
{
    _this = _super.call(this) || this;
    return 1;
}
set;
C(v);
{
    _this = _super.call(this) || this;
}
a: _this = _super.call(this) || this;
b();
{
    _this = _super.call(this) || this;
}
get;
C();
{
    _this = _super.call(this) || this;
    return 1;
}
set;
C(v);
{
    _this = _super.call(this) || this;
}
