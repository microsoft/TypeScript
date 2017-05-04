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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CBaseBase = (function () {
    function CBaseBase(x) {
    }
    return CBaseBase;
}());
var CBase = (function (_super) {
    __extends(CBase, _super);
    function CBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CBase;
}(CBaseBase));
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
var C = (function (_super) {
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
