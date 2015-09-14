//// [classConstructorAccessibility.ts]

class B {
    constructor(public x: number) { }
}

class C {
    public constructor(public x: number) { }
}

class D {
    private constructor(public x: number) { }
}

class E {
    protected constructor(public x: number) { }
}

var b = new B(1);
var c = new C(1);
var d = new D(1); // error - D is private
var e = new E(1); // error - E is protected

module Generic {
    class C<T> {
        public constructor(public x: T) { }
    }

    class D<T> {
        private constructor(public x: T) { }
    }

    class E<T> {
        protected constructor(public x: T) { }
    }

    var b = new B(1);
    var c = new C(1);
    var d = new D(1); // error - D is private
    var e = new E(1); // error - E is protected
}

// make sure signatures are covered.
let sig: new(x: number) => any;
sig = B;
sig = C;
sig = D; // error - private to public
sig = E; // error - protected to public

//// [classConstructorAccessibility.js]
var B = (function () {
    function B(x) {
        this.x = x;
    }
    return B;
})();
var C = (function () {
    function C(x) {
        this.x = x;
    }
    return C;
})();
var D = (function () {
    function D(x) {
        this.x = x;
    }
    return D;
})();
var E = (function () {
    function E(x) {
        this.x = x;
    }
    return E;
})();
var b = new B(1);
var c = new C(1);
var d = new D(1); // error - D is private
var e = new E(1); // error - E is protected
var Generic;
(function (Generic) {
    var C = (function () {
        function C(x) {
            this.x = x;
        }
        return C;
    })();
    var D = (function () {
        function D(x) {
            this.x = x;
        }
        return D;
    })();
    var E = (function () {
        function E(x) {
            this.x = x;
        }
        return E;
    })();
    var b = new B(1);
    var c = new C(1);
    var d = new D(1); // error - D is private
    var e = new E(1); // error - E is protected
})(Generic || (Generic = {}));
// make sure signatures are covered.
var sig;
sig = B;
sig = C;
sig = D; // error - private to public
sig = E; // error - protected to public


//// [classConstructorAccessibility.d.ts]
declare class B {
    x: number;
    constructor(x: number);
}
declare class C {
    x: number;
    constructor(x: number);
}
declare class D {
    x: number;
    constructor(x);
}
declare class E {
    x: number;
    constructor(x: number);
}
declare var b: B;
declare var c: C;
declare var d: D;
declare var e: E;
declare module Generic {
}
declare let sig: new (x: number) => any;
