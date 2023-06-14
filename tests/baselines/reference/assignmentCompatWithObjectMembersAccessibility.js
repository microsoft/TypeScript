//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithObjectMembersAccessibility.ts] ////

//// [assignmentCompatWithObjectMembersAccessibility.ts]
// members N and M of types S and T have the same name, same accessibility, same optionality, and N is assignable M

module TargetIsPublic {
    // targets
    class Base {
        public foo: string;
    }

    interface I {
        foo: string;
    }

    var a: { foo: string; }
    var b: Base;
    var i: I;

    // sources
    class D {
        public foo: string;
    }

    class E {
        private foo: string;
    }
    var d: D;
    var e: E;

    a = b;
    a = i;
    a = d;
    a = e; // error

    b = a;
    b = i;
    b = d;
    b = e; // error

    i = a;
    i = b;
    i = d;
    i = e; // error

    d = a;
    d = b;
    d = i;
    d = e; // error

    e = a; // errror
    e = b; // errror
    e = i; // errror
    e = d; // errror
    e = e; 

}

module TargetIsPublic {
    // targets
    class Base {
        private foo: string;
    }

    interface I extends Base {
    }

    var a: { foo: string; }
    var b: Base;
    var i: I;

    // sources
    class D {
        public foo: string;
    }

    class E {
        private foo: string;
    }

    var d: D;
    var e: E;

    a = b; // error
    a = i; // error
    a = d;
    a = e; // error

    b = a; // error
    b = i;
    b = d; // error
    b = e; // error
    b = b;
    
    i = a; // error
    i = b;
    i = d; // error
    i = e; // error
    i = i;

    d = a;
    d = b; // error
    d = i; // error
    d = e; // error

    e = a; // errror
    e = b; // errror
    e = i; // errror
    e = d; // errror
    e = e;

}

//// [assignmentCompatWithObjectMembersAccessibility.js]
// members N and M of types S and T have the same name, same accessibility, same optionality, and N is assignable M
var TargetIsPublic;
(function (TargetIsPublic) {
    // targets
    var Base = /** @class */ (function () {
        function Base() {
        }
        return Base;
    }());
    var a;
    var b;
    var i;
    // sources
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
    var E = /** @class */ (function () {
        function E() {
        }
        return E;
    }());
    var d;
    var e;
    a = b;
    a = i;
    a = d;
    a = e; // error
    b = a;
    b = i;
    b = d;
    b = e; // error
    i = a;
    i = b;
    i = d;
    i = e; // error
    d = a;
    d = b;
    d = i;
    d = e; // error
    e = a; // errror
    e = b; // errror
    e = i; // errror
    e = d; // errror
    e = e;
})(TargetIsPublic || (TargetIsPublic = {}));
(function (TargetIsPublic) {
    // targets
    var Base = /** @class */ (function () {
        function Base() {
        }
        return Base;
    }());
    var a;
    var b;
    var i;
    // sources
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
    var E = /** @class */ (function () {
        function E() {
        }
        return E;
    }());
    var d;
    var e;
    a = b; // error
    a = i; // error
    a = d;
    a = e; // error
    b = a; // error
    b = i;
    b = d; // error
    b = e; // error
    b = b;
    i = a; // error
    i = b;
    i = d; // error
    i = e; // error
    i = i;
    d = a;
    d = b; // error
    d = i; // error
    d = e; // error
    e = a; // errror
    e = b; // errror
    e = i; // errror
    e = d; // errror
    e = e;
})(TargetIsPublic || (TargetIsPublic = {}));
