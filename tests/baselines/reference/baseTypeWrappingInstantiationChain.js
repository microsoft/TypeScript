//// [baseTypeWrappingInstantiationChain.ts]
class CBaseBase<T3> {
    constructor(x: Parameter<T3>) { }
}

class CBase<T2> extends CBaseBase<Wrapper<T2>> {

}

class Parameter<T4> {
    method(t: T4) { }
}

class Wrapper<T5> {
    property: T5;
}

class C<T1> extends CBase<T1> {
    public works() {
        new CBaseBase<Wrapper<T1>>(this);
    }
    public alsoWorks() {
        new CBase<T1>(this); // Should not error, parameter is of type Parameter<Wrapper<T1>>
    }

    public method(t: Wrapper<T1>) { }
}


//// [baseTypeWrappingInstantiationChain.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CBaseBase = /** @class */ (function () {
    function CBaseBase(x) {
    }
    return CBaseBase;
}());
var CBase = /** @class */ (function (_super) {
    __extends(CBase, _super);
    function CBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CBase;
}(CBaseBase));
var Parameter = /** @class */ (function () {
    function Parameter() {
    }
    Parameter.prototype.method = function (t) { };
    return Parameter;
}());
var Wrapper = /** @class */ (function () {
    function Wrapper() {
    }
    return Wrapper;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.works = function () {
        new CBaseBase(this);
    };
    C.prototype.alsoWorks = function () {
        new CBase(this); // Should not error, parameter is of type Parameter<Wrapper<T1>>
    };
    C.prototype.method = function (t) { };
    return C;
}(CBase));
