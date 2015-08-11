//// [classConstructorAccessibility.ts]
class C {
    public constructor(public x: number) { }
}

class D {
    private constructor(public x: number) { }
}

class E {
    protected constructor(public x: number) { }
}

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

    var c = new C(1);
    var d = new D(1); // error - D is private
    var e = new E(1); // error - E is protected
}


//// [classConstructorAccessibility.js]
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
    var c = new C(1);
    var d = new D(1); // error - D is private
    var e = new E(1); // error - E is protected
})(Generic || (Generic = {}));
