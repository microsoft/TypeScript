//// [assignmentCompatWithObjectMembersOptionality2.ts]
// M is optional and S contains no property with the same name as M
// N is optional and T contains no property with the same name as N

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }

module TargetHasOptional {
    // targets
    interface C {
        opt?: Base
    }
    var c: C;

    var a: { opt?: Base; }
    var b: typeof a = { opt: new Base() }

    // sources
    interface D {
        other: Base;
    }
    interface E {
        other: Derived;
    }
    interface F {
        other?: Derived;
    }
    var d: D;
    var e: E;
    var f: F;

    // disallowed by weak type checking
    c = d;
    c = e;
    c = f;
    a = d;
    a = e;
    a = f;
    b = d;
    b = e;
    b = f;

    // ok
    c = a;
    a = c;
    b = a;
    b = c;
}

module SourceHasOptional {
    // targets
    interface C {
        opt: Base
    }
    var c: C;

    var a: { opt: Base; }
    var b = { opt: new Base() }

    // sources
    interface D {
        other?: Base;
    }
    interface E {
        other?: Derived;
    }
    interface F {
        other: Derived;
    }
    var d: D;
    var e: E;
    var f: F;

    c = d; // error
    c = e; // error
    c = f; // error
    c = a; // ok

    a = d; // error
    a = e; // error
    a = f; // error
    a = c; // ok

    b = d; // error
    b = e; // error
    b = f; // error
    b = a; // ok
    b = c; // ok
}


//// [assignmentCompatWithObjectMembersOptionality2.js]
// M is optional and S contains no property with the same name as M
// N is optional and T contains no property with the same name as N
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
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Derived));
var TargetHasOptional;
(function (TargetHasOptional) {
    var c;
    var a;
    var b = { opt: new Base() };
    var d;
    var e;
    var f;
    // disallowed by weak type checking
    c = d;
    c = e;
    c = f;
    a = d;
    a = e;
    a = f;
    b = d;
    b = e;
    b = f;
    // ok
    c = a;
    a = c;
    b = a;
    b = c;
})(TargetHasOptional || (TargetHasOptional = {}));
var SourceHasOptional;
(function (SourceHasOptional) {
    var c;
    var a;
    var b = { opt: new Base() };
    var d;
    var e;
    var f;
    c = d; // error
    c = e; // error
    c = f; // error
    c = a; // ok
    a = d; // error
    a = e; // error
    a = f; // error
    a = c; // ok
    b = d; // error
    b = e; // error
    b = f; // error
    b = a; // ok
    b = c; // ok
})(SourceHasOptional || (SourceHasOptional = {}));
