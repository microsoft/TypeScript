//// [errorSuperCalls.ts]
//super call in class constructor with no base type
class NoBase {
    constructor() {
        super();
    }

    //super call in class member function with no base type
    fn() {
        super();
    }

    //super call in class accessor (get and set) with no base type
    get foo() {
        super();
        return null;
    }
    set foo(v) {
        super();
    }

    //super call in class member initializer with no base type
    p = super();

    //super call in static class member function with no base type
    static fn() {
        super();
    }

    //super call in static class member initializer with no base type
    static k = super();

    //super call in static class accessor (get and set) with no base type
    static get q() {
        super();
        return null;
    }
    static set q(n) {
        super();
    }
}

class Base<T> { private n: T; }
class Derived<T> extends Base<T> {
    //super call with type arguments 
    constructor() {
        super<string>();
        super();
    }
}


class OtherBase {
    private n: string;
}

class OtherDerived extends OtherBase {
    //super call in class member initializer of derived type
    t = super();

    fn() {
        //super call in class member function of derived type
        super();
    }

    //super call in class accessor (get and set) of derived type
    get foo() {
        super();
        return null;
    }
    set foo(n) {
        super();
    }
}


//// [errorSuperCalls.js]
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
//super call in class constructor with no base type
var NoBase = /** @class */ (function () {
    function NoBase() {
        _this = _super.call(this) || this;
        //super call in class member initializer with no base type
        this.p = _this = _super.call(this) || this;
    }
    //super call in class member function with no base type
    NoBase.prototype.fn = function () {
        _this = _super.call(this) || this;
    };
    Object.defineProperty(NoBase.prototype, "foo", {
        //super call in class accessor (get and set) with no base type
        get: function () {
            _this = _super.call(this) || this;
            return null;
        },
        set: function (v) {
            _this = _super.call(this) || this;
        },
        enumerable: false,
        configurable: true
    });
    //super call in static class member function with no base type
    NoBase.fn = function () {
        _this = _super.call(this) || this;
    };
    Object.defineProperty(NoBase, "q", {
        //super call in static class accessor (get and set) with no base type
        get: function () {
            _this = _super.call(this) || this;
            return null;
        },
        set: function (n) {
            _this = _super.call(this) || this;
        },
        enumerable: false,
        configurable: true
    });
    //super call in static class member initializer with no base type
    NoBase.k = _this = _super.call(this) || this;
    return NoBase;
}());
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    //super call with type arguments 
    function Derived() {
        var _this = _super.call(this) || this;
        _this = _super.call(this) || this;
        return _this;
    }
    return Derived;
}(Base));
var OtherBase = /** @class */ (function () {
    function OtherBase() {
    }
    return OtherBase;
}());
var OtherDerived = /** @class */ (function (_super) {
    __extends(OtherDerived, _super);
    function OtherDerived() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //super call in class member initializer of derived type
        _this.t = _this = _super.call(this) || this;
        return _this;
    }
    OtherDerived.prototype.fn = function () {
        //super call in class member function of derived type
        _this = _super.call(this) || this;
    };
    Object.defineProperty(OtherDerived.prototype, "foo", {
        //super call in class accessor (get and set) of derived type
        get: function () {
            _this = _super.call(this) || this;
            return null;
        },
        set: function (n) {
            _this = _super.call(this) || this;
        },
        enumerable: false,
        configurable: true
    });
    return OtherDerived;
}(OtherBase));
