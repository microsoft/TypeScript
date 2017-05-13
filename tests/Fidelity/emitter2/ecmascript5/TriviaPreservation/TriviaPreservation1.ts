// Hello
/* World
*/

// aaa
export var x1;

// aaa
// bbb
export var x2 = 1;

/* aaa */
export var x3;

/* aaa
bbb */
export var x4: string = "";

// aaa
window.console;

// aaa
export var x5 = [];

export var x5a = /*////*/[];

/* aaa */
export var x6 = {};

export var x6a = /*;;;*/{};

export var test = {
    // hm
    a: 1
}

// hm
export var x7 = {
    // a
    a: 1,
    // b
    b: "",
    // c
    c: [],
    // d
    d: {
        /* e */
        e: /* e2 */ 2
    }
}

// aaa
export var x8 = /* a */ () /* b */ => { /* returns */ return 1; };

/// aaa
export var x9 = () => {
    // a
    var a: () => void /* hm*/ = () => { return; } /* ok */;
    // return
    return a();
}

// aaa
export function x10() {
    // bbb
    return;
}

// aaa
export function x11(/*x*/x: number/*x*/, /*y*/y: string/*y*/, /*z*/z?: string/*z*/) {
    // bbb
    return;
}

export var x12 = /*aaa*/function /*bbb*/ (x, y: any) {
    /// aaa
    x10();
}

export var x13 = /*aaa*/function /*bbb*/ foo(/*x*/x/*x2*/, y: any) {
    /// aaa
    if (false) {
        // hm
        //foo(x, y); // TODO: how does this work?
    }
}

// if
if (true) {
    // do BUG?
}
// then
else {
    // do
}

// try
try {
    // aaa
    var xx;
}
// catch
catch (e) {
    // bbb
    throw e;
}
// finally
finally {
    // ccc
}

// for
for (var i = 0 /*var*/; i < 10 /*condition*/; i++) {
    // do
    var xx = i;
}

// for
for (var i = 0 /*var*/, j = 0 /*and*/; i < 10 /*condition*/; i++) {
    // do
    var xx = i;
}

// class
export class X {
    // public
    public x1(/*x*/x/*x2*/,/*y*/y/*y2*/) {
    }
    // private BUG appears at the end of x1's definition instead of where //public does
    private x2(/*x*/x: number/*x*/, /*y*/y?: string/*y2*/) {
    }
    // none
    x3(/*hm*/) {
    }

    x = 1; // x
    // xx
    xx; // xx2 BUG? not compiled away like //xx
    // y
    y: string = "";
    // z
    z = {
        // z.a BUG? z.a after : but also different ordering of the two comments for a vs b
        a: 1, // and BUG?
        /* z.b */
        b: "" // also BUG?
        };
    // end BUG? outside class definition
}

// interface
export interface I {
    // goes BUG none of these comments are removed if this is at EOF
    x: number;
    /* away */
    y: string;
    // right?
}

// hm
export interface I2 { /* ok */ }

// aaa
export interface I3 {
    /// b
    x: I2;
    /// c
    y: X;
}

// interface
export interface I4 {
    // with
    new ();
    // some
    (...p3: any[]);
    // stuff
    [p1: string];
}

// class
export class X2 /*implements*/ implements /*thing*/ I {
    // x
    x = 1; // x2
    // y
    y = ""; // y2 BUG: placed outside X2's definition, if not the last member then it's outside X's constructor function
    // end
}

// class
export class X3 implements I3 {
    // x
    x = {} // x2
    /* y */
    y = new X(/*hm*/); /* y2 */ // BUG: y2 ends up inside foo's definition
    // public
    public foo(): X {
        // return
        return this.y; // something
    }

    // hm: BUG static comments are lost and put in the wrong place
    static a = 1; // ok
    // and
    static b; /* ok */

}

// class
export class X4 { // really? BUG this is dropped
    // overloading
    foo(x: number);
    // works
    foo(x: string);
    // right? BUG drop all these comments
    foo(x: any) {
        return x;
    }
}

// class // BUG: interleaved comments are dropped with certain class contents
export class X5 /* extends*/ extends /*a thing*/ X4 { 
    // this
    foo(x: number[]);
    // that
    foo(x: any) {
        return x;
    }
}

export class X6 extends X3 {
    // hm
    public foo(): X {
        return this.y;
    }
}

// class
export class X7 {
    // constructor
    constructor() {
    }

    // getter BUG not great, getter and setter comments in different places
    public get x() {
        // get
        return 1;
    }

    // setter
    public set x() {
        // set
    }

    // rest BUG inside defineProperty definition
    foo(...p:any[]/*params*/) {
        // ok
        return p[0];
    }
}

// class 
export class X8 extends X7 {
    // constructor
    constructor() {
        super(); // super
        // x
        var x = 1; /* x */
        // xx
        var xx; // xx BUG not compiled away?
        // done
    } // end1

    // x1
    x1(): string {
        return "";
    }

    // x2 BUG not in the right place at all
    x2 = function foo(): string {
        // does
        return x1();
    }

    // end2 BUG this ends up after assigning x2 in the constructor function
}

// BUG: statics are almost all wrong
export class X9 {
    // x BUG removed
    static x; // x2 BUG removed
    /* y */ // BUG removed
    static y = 1; // y2 BUG outside class decl when nothing follows class definition
    // foo
    static foo() {
        // returning
        return;
    }

    // getter BUG not great, getter and setter comments in different places
    static get z() {
        // get
        return 1;
    }

    // setter
    static set z() {
        // set
    }
}

// 1
export declare var x; // 2
// 3
export declare function dFoo(): any; // 4
// 5
export declare interface dI7 {
    // 6 BUG
}; // 7 BUG
// 8
export declare class dC { 
    // 9
}; // 10 BUG
// 11
export declare module dM { 
    // 12
}; // 13 BUG

/// 14
/// 14_1 BUG removed when it shouldn't be
export declare var x2; /// 15
/// 16
export declare function dFoo2(): any; /// 17
/// 18
export declare interface dI72 {
    /// 19 BUG
}; /// 20 BUG
/// 21
export declare class dC2 { 
    /// 22
}; /// 23 BUG
/// 24
export declare module dM2 { 
    /// 25
}; /// 26

/** 27 
 * BUG removed when it shouldn't be
 */
export declare var x3; /** 28 */
/** 29 */
export declare function dFoo3(): any; /** 30 */
/** 31 */
export declare interface dI73 {
    /** 32 */
}; /** 33 */
/** declareC */
export declare class dC3 { 
    /** 34 */
}; /** 35 */
/** 36 */
export declare module dM3 { 
    /** 37 */
}; /** 38 */

////////////////// MODULE WRAPPING

// M1
export module M1 {
    // x
    export var x = 1;
    
    // class
    export class X2 /*implements*/ implements /*thing*/ I {
        // x
        x = 1; // x2 BUG: placed after x
        // y
        y = ""; // y2 BUG: placed outside X2's definition, if not the last member then it's outside X's constructor function
        // end
    }

    // class
    export class X3 implements I3 {
        // x
        x = { /* hello */ } // x2 BUG hello and x2 placed after x
        /* y */
        y = new X(/*hm*/); /* y2 */ // BUG: y2 ends up inside foo's definition
        // public
        public foo(): X {
            // return
            return this.y; // something
        }

        // hm: BUG static comments are lost and put in the wrong place
        static a = 1; // ok
        // and
        static b; /* ok */
    }

    // declare
    export declare var x; // x
    // declareFoo
    export declare function dFoo(): any; // foo
    // declareI
    export declare interface dI7 {
        // hm1 BUG not removed
    }; // di8 BUG not removed
    // declareC
    export declare class dC { 
        // hm2
    }; // dc BUG not removed
    export declare module dM { 
        // hm3
    }; // dM BUG not removed

    // nested
    export module N1 {
        // BUG: statics are all wrong
        export class X9 {
            // x BUG removed
            static x; // x2 BUG removed
            /* y */ // BUG removed
            static y = 1; // y2
            // foo
            static foo() {
                // returning
                return;
            }
        }
        //endN1
    }
    // endM1
}

/**
 * A class
 * Does stuff
 * @author me
 */
export class X10 {
    /**
     * @constructor
     */
    constructor(x: number) {
        var z = x;
    }

    x = 1;
    y = "";

    /** BUG this is inside foo's definition
     * @deprecated
     * @this (X10)
     */
    foo() { }
    /** BUG this is inside foo's definition
     * Does some other stuff
     *
     * @param (number) x a number
     * @param (string) y a string
     * @return (string) aValue
     *
     */
    bar(x, y: string) {
        return y;
    }
}