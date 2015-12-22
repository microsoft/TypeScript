//// [baseTypeWrappingInstantiationChain.ts]
class C<T1> extends CBase<T1> {
    public works() {
        new CBaseBase<Wrapper<T1>>(this);
    }
    public alsoWorks() {
        new CBase<T1>(this); // Should not error, parameter is of type Parameter<Wrapper<T1>>
    }

    public method(t: Wrapper<T1>) { }
}

class CBase<T2> extends CBaseBase<Wrapper<T2>> {

}

class CBaseBase<T3> {
    constructor(x: Parameter<T3>) { }
}

class Parameter<T4> {
    method(t: T4) { }
}

class Wrapper<T5> {
    property: T5;
}

//// [baseTypeWrappingInstantiationChain.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
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
var CBase = (function (_super) {
    __extends(CBase, _super);
    function CBase() {
        _super.apply(this, arguments);
    }
    return CBase;
}(CBaseBase));
var CBaseBase = (function () {
    function CBaseBase(x) {
    }
    return CBaseBase;
}());
var Parameter = (function () {
    function Parameter() {
    }
    Parameter.prototype.method = function (t) { };
    return Parameter;
}());
var Wrapper = (function () {
    function Wrapper() {
    }
    return Wrapper;
}());
