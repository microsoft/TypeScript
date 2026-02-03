//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClasses.ts] ////

//// [index.js]
export class A {}

export class B {
    static cat = "cat";
}

export class C {
    static Cls = class {}
}

export class D {
    /**
     * @param {number} a
     * @param {number} b
     */
    constructor(a, b) {}
}

/**
 * @template T,U
 */
export class E {
    /**
     * @type {T & U}
     */
    field;

    // @readonly is currently unsupported, it seems - included here just in case that changes
    /**
     * @type {T & U}
     * @readonly
     */
    readonlyField;

    initializedField = 12;

    /**
     * @return {U}
     */
    get f1() { return /** @type {*} */(null); }

    /**
     * @param {U} _p
     */
    set f1(_p) {}

    /**
     * @return {U}
     */
    get f2() { return /** @type {*} */(null); }

    /**
     * @param {U} _p
     */
    set f3(_p) {}

    /**
     * @param {T} a
     * @param {U} b
     */
    constructor(a, b) {}


    /**
     * @type {string}
     */
    static staticField;

    // @readonly is currently unsupported, it seems - included here just in case that changes
    /**
     * @type {string}
     * @readonly
     */
    static staticReadonlyField;

    static staticInitializedField = 12;

    /**
     * @return {string}
     */
    static get s1() { return ""; }

    /**
     * @param {string} _p
     */
    static set s1(_p) {}

    /**
     * @return {string}
     */
    static get s2() { return ""; }

    /**
     * @param {string} _p
     */
    static set s3(_p) {}
}

/**
 * @template T,U
 */
export class F {
    /**
     * @type {T & U}
     */
    field;
    /**
     * @param {T} a
     * @param {U} b
     */
    constructor(a, b) {}

    /**
     * @template A,B
     * @param {A} a
     * @param {B} b
     */
    static create(a, b) { return new F(a, b); }
}

class G {}

export { G };

class HH {}

export { HH as H };

export class I {}
export { I as II };

export { J as JJ };
export class J {}


export class K {
    constructor() {
        this.p1 = 12;
        this.p2 = "ok";
    }

    method() {
        return this.p1;
    }
}

export class L extends K {}

export class M extends null {
    constructor() {
        this.prop = 12;
    }
}


/**
 * @template T
 */
export class N extends L {
    /**
     * @param {T} param 
     */
    constructor(param) {
        super();
        this.another = param;
    }
}

/**
 * @template U
 * @extends {N<U>}
 */
export class O extends N {
    /**
     * @param {U} param 
     */
    constructor(param) {
        super(param);
        this.another2 = param;
    }
}

var x = /** @type {*} */(null);

export class VariableBase extends x {}

export class HasStatics {
    static staticMethod() {}
}

export class ExtendsStatics extends HasStatics {
    static also() {}
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendsStatics = exports.HasStatics = exports.VariableBase = exports.O = exports.N = exports.M = exports.L = exports.K = exports.J = exports.JJ = exports.II = exports.I = exports.H = exports.G = exports.F = exports.E = exports.D = exports.C = exports.B = exports.A = void 0;
class A {
}
exports.A = A;
let B = (() => {
    class B {
    }
    B.cat = "cat";
    return B;
})();
exports.B = B;
let C = (() => {
    class C {
    }
    C.Cls = class {
    };
    return C;
})();
exports.C = C;
class D {
    /**
     * @param {number} a
     * @param {number} b
     */
    constructor(a, b) { }
}
exports.D = D;
/**
 * @template T,U
 */
let E = (() => {
    class E {
        /**
         * @return {U}
         */
        get f1() { return /** @type {*} */ (null); }
        /**
         * @param {U} _p
         */
        set f1(_p) { }
        /**
         * @return {U}
         */
        get f2() { return /** @type {*} */ (null); }
        /**
         * @param {U} _p
         */
        set f3(_p) { }
        /**
         * @param {T} a
         * @param {U} b
         */
        constructor(a, b) {
            this.initializedField = 12;
        }
        /**
         * @return {string}
         */
        static get s1() { return ""; }
        /**
         * @param {string} _p
         */
        static set s1(_p) { }
        /**
         * @return {string}
         */
        static get s2() { return ""; }
        /**
         * @param {string} _p
         */
        static set s3(_p) { }
    }
    E.staticInitializedField = 12;
    return E;
})();
exports.E = E;
/**
 * @template T,U
 */
class F {
    /**
     * @param {T} a
     * @param {U} b
     */
    constructor(a, b) { }
    /**
     * @template A,B
     * @param {A} a
     * @param {B} b
     */
    static create(a, b) { return new F(a, b); }
}
exports.F = F;
class G {
}
exports.G = G;
class HH {
}
exports.H = HH;
class I {
}
exports.I = I;
exports.II = I;
class J {
}
exports.J = J;
exports.JJ = J;
class K {
    constructor() {
        this.p1 = 12;
        this.p2 = "ok";
    }
    method() {
        return this.p1;
    }
}
exports.K = K;
class L extends K {
}
exports.L = L;
class M extends null {
    constructor() {
        this.prop = 12;
    }
}
exports.M = M;
/**
 * @template T
 */
class N extends L {
    /**
     * @param {T} param
     */
    constructor(param) {
        super();
        this.another = param;
    }
}
exports.N = N;
/**
 * @template U
 * @extends {N<U>}
 */
class O extends N {
    /**
     * @param {U} param
     */
    constructor(param) {
        super(param);
        this.another2 = param;
    }
}
exports.O = O;
var x = /** @type {*} */ (null);
class VariableBase extends x {
}
exports.VariableBase = VariableBase;
class HasStatics {
    static staticMethod() { }
}
exports.HasStatics = HasStatics;
class ExtendsStatics extends HasStatics {
    static also() { }
}
exports.ExtendsStatics = ExtendsStatics;


//// [index.d.ts]
export class A {
}
export class B {
    static cat: string;
}
export class C {
    static Cls: {
        new (): {};
    };
}
export class D {
    /**
     * @param {number} a
     * @param {number} b
     */
    constructor(a: number, b: number);
}
/**
 * @template T,U
 */
export class E<T, U> {
    /**
     * @type {string}
     */
    static staticField: string;
    /**
     * @type {string}
     * @readonly
     */
    static readonly staticReadonlyField: string;
    static staticInitializedField: number;
    /**
     * @param {string} _p
     */
    static set s1(_p: string);
    /**
     * @return {string}
     */
    static get s1(): string;
    /**
     * @return {string}
     */
    static get s2(): string;
    /**
     * @param {string} _p
     */
    static set s3(_p: string);
    /**
     * @param {T} a
     * @param {U} b
     */
    constructor(a: T, b: U);
    /**
     * @type {T & U}
     */
    field: T & U;
    /**
     * @type {T & U}
     * @readonly
     */
    readonly readonlyField: T & U;
    initializedField: number;
    /**
     * @param {U} _p
     */
    set f1(_p: U);
    /**
     * @return {U}
     */
    get f1(): U;
    /**
     * @return {U}
     */
    get f2(): U;
    /**
     * @param {U} _p
     */
    set f3(_p: U);
}
/**
 * @template T,U
 */
export class F<T, U> {
    /**
     * @template A,B
     * @param {A} a
     * @param {B} b
     */
    static create<A, B>(a: A, b: B): F<A, B>;
    /**
     * @param {T} a
     * @param {U} b
     */
    constructor(a: T, b: U);
    /**
     * @type {T & U}
     */
    field: T & U;
}
export class I {
}
export class J {
}
export class K {
    p1: number;
    p2: string;
    method(): number;
}
export class L extends K {
}
export class M {
    prop: number;
}
/**
 * @template T
 */
export class N<T> extends L {
    /**
     * @param {T} param
     */
    constructor(param: T);
    another: T;
}
/**
 * @template U
 * @extends {N<U>}
 */
export class O<U> extends N<U> {
    another2: U;
}
declare const VariableBase_base: any;
export class VariableBase extends VariableBase_base {
    [x: string]: any;
}
export class HasStatics {
    static staticMethod(): void;
}
export class ExtendsStatics extends HasStatics {
    static also(): void;
}
export class G {
}
declare class HH {
}
export { HH as H, I as II, J as JJ };
