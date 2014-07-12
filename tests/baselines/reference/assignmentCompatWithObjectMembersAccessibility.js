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
var TargetIsPublic;
(function (TargetIsPublic) {
    var Base = (function () {
        function Base() {
        }
        return Base;
    })();
    var a;
    var b;
    var i;
    var D = (function () {
        function D() {
        }
        return D;
    })();
    var E = (function () {
        function E() {
        }
        return E;
    })();
    var d;
    var e;
    a = b;
    a = i;
    a = d;
    a = e;
    b = a;
    b = i;
    b = d;
    b = e;
    i = a;
    i = b;
    i = d;
    i = e;
    d = a;
    d = b;
    d = i;
    d = e;
    e = a;
    e = b;
    e = i;
    e = d;
    e = e;
})(TargetIsPublic || (TargetIsPublic = {}));
var TargetIsPublic;
(function (TargetIsPublic) {
    var Base = (function () {
        function Base() {
        }
        return Base;
    })();
    var a;
    var b;
    var i;
    var D = (function () {
        function D() {
        }
        return D;
    })();
    var E = (function () {
        function E() {
        }
        return E;
    })();
    var d;
    var e;
    a = b;
    a = i;
    a = d;
    a = e;
    b = a;
    b = i;
    b = d;
    b = e;
    b = b;
    i = a;
    i = b;
    i = d;
    i = e;
    i = i;
    d = a;
    d = b;
    d = i;
    d = e;
    e = a;
    e = b;
    e = i;
    e = d;
    e = e;
})(TargetIsPublic || (TargetIsPublic = {}));
