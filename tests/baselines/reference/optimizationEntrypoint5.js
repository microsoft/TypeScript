//// [tests/cases/compiler/optimizationEntrypoint5.ts] ////

//// [index.ts]

import * as foo from "./foo";
export * from "./foo";

export class Main {
	a: foo.A;
	b: [foo.B];
	c: (foo.C);
	d: foo.D[];
	e: foo.E | foo.E2;
	f: foo.F & foo.F2;
	g: foo.GAlias;
	h: {item: foo.H};
	i: foo.IAlias;
	j: foo.J<number>;
	jj: foo.AnyJ;
}

//// [foo.ts]

export class A {}
export class B {}
export class C {}
export class D {}
export class E {}
export class F {}
export class E2 {}
export class F2 {}
export class G {}
export type GAlias = G | A;
export class H {}
export class I {}
export type IAlias = I;
export class J<T> {}
export type AnyJ = J<any>;


//// [bundled.js]
define("tests/cases/compiler/foo", ["require", "exports"], function (require, exports) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    exports.A = A;
    var B = (function () {
        function B() {
        }
        return B;
    })();
    exports.B = B;
    var C = (function () {
        function C() {
        }
        return C;
    })();
    exports.C = C;
    var D = (function () {
        function D() {
        }
        return D;
    })();
    exports.D = D;
    var E = (function () {
        function E() {
        }
        return E;
    })();
    exports.E = E;
    var F = (function () {
        function F() {
        }
        return F;
    })();
    exports.F = F;
    var E2 = (function () {
        function E2() {
        }
        return E2;
    })();
    exports.E2 = E2;
    var F2 = (function () {
        function F2() {
        }
        return F2;
    })();
    exports.F2 = F2;
    var G = (function () {
        function G() {
        }
        return G;
    })();
    exports.G = G;
    var H = (function () {
        function H() {
        }
        return H;
    })();
    exports.H = H;
    var I = (function () {
        function I() {
        }
        return I;
    })();
    exports.I = I;
    var J = (function () {
        function J() {
        }
        return J;
    })();
    exports.J = J;
});
define("tests/cases/compiler/index", ["require", "exports", "tests/cases/compiler/foo"], function (require, exports, foo_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(foo_1);
    var Main = (function () {
        function Main() {
        }
        return Main;
    })();
    exports.Main = Main;
});


//// [bundled.d.ts]
export declare class A {
}
export declare class B {
}
export declare class C {
}
export declare class D {
}
export declare class E {
}
export declare class F {
}
export declare class E2 {
}
export declare class F2 {
}
export declare class G {
}
export declare class H {
}
export declare class I {
}
export declare class J<T> {
}
export declare class Main {
    a: A;
    b: [B];
    c: (C);
    d: D[];
    e: E | E2;
    f: F & F2;
    g: GAlias;
    h: {
        item: H;
    };
    i: IAlias;
    j: J<number>;
    jj: AnyJ;
}
export declare type GAlias = G | A;
export declare type IAlias = I;
export declare type AnyJ = J<any>;
