//// [classConstructorAccessibility.ts]
class C {
    public constructor(public x: number) { }
}

class D {
    private constructor(public x: number) { } // error
}

class E {
    protected constructor(public x: number) { } // error
}

var c = new C(1);
var d = new D(1);
var e = new E(1);

module Generic {
    class C<T> {
        public constructor(public x: T) { }
    }

    class D<T> {
        private constructor(public x: T) { } // error
    }

    class E<T> {
        protected constructor(public x: T) { } // error
    }

    var c = new C(1);
    var d = new D(1);
    var e = new E(1);
}


//// [classConstructorAccessibility.js]
var C = (function () {
    function C(x) {
        this.x = x;
    }
    return C;
}());
var D = (function () {
    function D(x) {
        this.x = x;
    } // error
    return D;
}());
var E = (function () {
    function E(x) {
        this.x = x;
    } // error
    return E;
}());
var c = new C(1);
var d = new D(1);
var e = new E(1);
var Generic;
(function (Generic) {
    var C = (function () {
        function C(x) {
            this.x = x;
        }
        return C;
    }());
    var D = (function () {
        function D(x) {
            this.x = x;
        } // error
        return D;
    }());
    var E = (function () {
        function E(x) {
            this.x = x;
        } // error
        return E;
    }());
    var c = new C(1);
    var d = new D(1);
    var e = new E(1);
})(Generic || (Generic = {}));
