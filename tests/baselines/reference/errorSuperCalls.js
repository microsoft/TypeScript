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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//super call in class constructor with no base type
var NoBase = (function () {
    function NoBase() {
        //super call in class member initializer with no base type
        this.p = _super.call(this);
        _super.call(this);
    }
    //super call in class member function with no base type
    NoBase.prototype.fn = function () {
        _super.call(this);
    };
    Object.defineProperty(NoBase.prototype, "foo", {
        //super call in class accessor (get and set) with no base type
        get: function () {
            _super.call(this);
            return null;
        },
        set: function (v) {
            _super.call(this);
        },
        enumerable: true,
        configurable: true
    });
    //super call in static class member function with no base type
    NoBase.fn = function () {
        _super.call(this);
    };
    Object.defineProperty(NoBase, "q", {
        //super call in static class accessor (get and set) with no base type
        get: function () {
            _super.call(this);
            return null;
        },
        set: function (n) {
            _super.call(this);
        },
        enumerable: true,
        configurable: true
    });
    //super call in static class member initializer with no base type
    NoBase.k = _super.call(this);
    return NoBase;
}());
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    //super call with type arguments 
    function Derived() {
        _super.prototype..call(this);
        _super.call(this);
    }
    return Derived;
}(Base));
var OtherBase = (function () {
    function OtherBase() {
    }
    return OtherBase;
}());
var OtherDerived = (function (_super) {
    __extends(OtherDerived, _super);
    function OtherDerived() {
        _super.apply(this, arguments);
        //super call in class member initializer of derived type
        this.t = _super.call(this);
    }
    OtherDerived.prototype.fn = function () {
        //super call in class member function of derived type
        _super.call(this);
    };
    Object.defineProperty(OtherDerived.prototype, "foo", {
        //super call in class accessor (get and set) of derived type
        get: function () {
            _super.call(this);
            return null;
        },
        set: function (n) {
            _super.call(this);
        },
        enumerable: true,
        configurable: true
    });
    return OtherDerived;
}(OtherBase));
