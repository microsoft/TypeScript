// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: index.js
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
