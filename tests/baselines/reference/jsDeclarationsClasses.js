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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendsStatics = exports.HasStatics = exports.VariableBase = exports.O = exports.N = exports.M = exports.L = exports.K = exports.J = exports.JJ = exports.II = exports.I = exports.H = exports.G = exports.F = exports.E = exports.D = exports.C = exports.B = exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
var B = /** @class */ (function () {
    function B() {
    }
    B.cat = "cat";
    return B;
}());
exports.B = B;
var C = /** @class */ (function () {
    function C() {
    }
    C.Cls = /** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }());
    return C;
}());
exports.C = C;
var D = /** @class */ (function () {
    /**
     * @param {number} a
     * @param {number} b
     */
    function D(a, b) {
    }
    return D;
}());
exports.D = D;
/**
 * @template T,U
 */
var E = /** @class */ (function () {
    /**
     * @param {T} a
     * @param {U} b
     */
    function E(a, b) {
        this.initializedField = 12;
    }
    Object.defineProperty(E.prototype, "f1", {
        /**
         * @return {U}
         */
        get: function () { return /** @type {*} */ (null); },
        /**
         * @param {U} _p
         */
        set: function (_p) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(E.prototype, "f2", {
        /**
         * @return {U}
         */
        get: function () { return /** @type {*} */ (null); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(E.prototype, "f3", {
        /**
         * @param {U} _p
         */
        set: function (_p) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(E, "s1", {
        /**
         * @return {string}
         */
        get: function () { return ""; },
        /**
         * @param {string} _p
         */
        set: function (_p) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(E, "s2", {
        /**
         * @return {string}
         */
        get: function () { return ""; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(E, "s3", {
        /**
         * @param {string} _p
         */
        set: function (_p) { },
        enumerable: false,
        configurable: true
    });
    E.staticInitializedField = 12;
    return E;
}());
exports.E = E;
/**
 * @template T,U
 */
var F = /** @class */ (function () {
    /**
     * @param {T} a
     * @param {U} b
     */
    function F(a, b) {
    }
    /**
     * @template A,B
     * @param {A} a
     * @param {B} b
     */
    F.create = function (a, b) { return new F(a, b); };
    return F;
}());
exports.F = F;
var G = /** @class */ (function () {
    function G() {
    }
    return G;
}());
exports.G = G;
var HH = /** @class */ (function () {
    function HH() {
    }
    return HH;
}());
exports.H = HH;
var I = /** @class */ (function () {
    function I() {
    }
    return I;
}());
exports.I = I;
exports.II = I;
var J = /** @class */ (function () {
    function J() {
    }
    return J;
}());
exports.JJ = J;
exports.J = J;
var K = /** @class */ (function () {
    function K() {
        this.p1 = 12;
        this.p2 = "ok";
    }
    K.prototype.method = function () {
        return this.p1;
    };
    return K;
}());
exports.K = K;
var L = /** @class */ (function (_super) {
    __extends(L, _super);
    function L() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return L;
}(K));
exports.L = L;
var M = /** @class */ (function (_super) {
    __extends(M, _super);
    function M() {
        _this.prop = 12;
    }
    return M;
}(null));
exports.M = M;
/**
 * @template T
 */
var N = /** @class */ (function (_super) {
    __extends(N, _super);
    /**
     * @param {T} param
     */
    function N(param) {
        var _this = _super.call(this) || this;
        _this.another = param;
        return _this;
    }
    return N;
}(L));
exports.N = N;
/**
 * @template U
 * @extends {N<U>}
 */
var O = /** @class */ (function (_super) {
    __extends(O, _super);
    /**
     * @param {U} param
     */
    function O(param) {
        var _this = _super.call(this, param) || this;
        _this.another2 = param;
        return _this;
    }
    return O;
}(N));
exports.O = O;
var x = /** @type {*} */ (null);
var VariableBase = /** @class */ (function (_super) {
    __extends(VariableBase, _super);
    function VariableBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VariableBase;
}(x));
exports.VariableBase = VariableBase;
var HasStatics = /** @class */ (function () {
    function HasStatics() {
    }
    HasStatics.staticMethod = function () { };
    return HasStatics;
}());
exports.HasStatics = HasStatics;
var ExtendsStatics = /** @class */ (function (_super) {
    __extends(ExtendsStatics, _super);
    function ExtendsStatics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtendsStatics.also = function () { };
    return ExtendsStatics;
}(HasStatics));
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
    static set s1(arg: string);
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
    static set s3(arg: string);
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
    set f1(arg: U);
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
    set f3(arg: U);
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
    static create<A_1, B_1>(a: A_1, b: B_1): F<A_1, B_1>;
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
