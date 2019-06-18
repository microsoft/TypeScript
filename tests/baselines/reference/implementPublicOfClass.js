//// [implementPublicOfClass.ts]
class Base {
    private foo(): any { }

    public bar(): any { }
}

class BaseExtendedFail implements Base {
    public bar() { }
}

class BaseExtended implements PublicOf<Base> {
    public bar() { }
}


//// [implementPublicOfClass.js]
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.foo = function () { };
    Base.prototype.bar = function () { };
    return Base;
}());
var BaseExtendedFail = /** @class */ (function () {
    function BaseExtendedFail() {
    }
    BaseExtendedFail.prototype.bar = function () { };
    return BaseExtendedFail;
}());
var BaseExtended = /** @class */ (function () {
    function BaseExtended() {
    }
    BaseExtended.prototype.bar = function () { };
    return BaseExtended;
}());
