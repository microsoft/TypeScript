//// [declInput4.ts]
module M {
    class C { }
    export class E {}
    export interface I1 {}
    interface I2 {}
    export class D {
        public m1: number;
        public m2: string;
        public m23: E;
        public m24: I1;
        public m232(): E { return null;}
        public m242(): I1 { return null; }
        public m26(i:I1) {}
    }
}

//// [declInput4.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        return C;
    }());
    var E = (function () {
        function E() {
        }
        return E;
    }());
    M.E = E;
    var D = (function () {
        function D() {
        }
        D.prototype.m232 = function () { return null; };
        D.prototype.m242 = function () { return null; };
        D.prototype.m26 = function (i) { };
        __names(D.prototype, ["m232", "m242", "m26"]);
        return D;
    }());
    M.D = D;
})(M || (M = {}));


//// [declInput4.d.ts]
declare module M {
    class E {
    }
    interface I1 {
    }
    class D {
        m1: number;
        m2: string;
        m23: E;
        m24: I1;
        m232(): E;
        m242(): I1;
        m26(i: I1): void;
    }
}
