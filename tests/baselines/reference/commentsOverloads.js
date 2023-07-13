//// [tests/cases/compiler/commentsOverloads.ts] ////

//// [commentsOverloads.ts]
/** this is signature 1*/
function f1(/**param a*/a: number): number;
function f1(b: string): number;
function f1(aOrb: any) {
    return 10;
}
f1("hello");
f1(10);
function f2(a: number): number;
/** this is signature 2*/
function f2(b: string): number;
/** this is f2 var comment*/
function f2(aOrb: any) {
    return 10;
}
f2("hello");
f2(10);
function f3(a: number): number;
function f3(b: string): number;
function f3(aOrb: any) {
    return 10;
}
f3("hello");
f3(10);
/** this is signature 4 - with number parameter*/
function f4(/**param a*/a: number): number;
/** this is signature 4 - with string parameter*/
function f4(b: string): number;
function f4(aOrb: any) {
    return 10;
}
f4("hello");
f4(10);
interface i1 {
    /**this signature 1*/
    (/**param a*/ a: number): number;
    /**this is signature 2*/
    (b: string): number;
    /** foo 1*/
    foo(a: number): number;
    /** foo 2*/
    foo(b: string): number;
    // foo 3
    foo(arr: number[]): number;
    /** foo 4 */
    foo(arr: string[]): number;

    foo2(a: number): number;
    /** foo2 2*/
    foo2(b: string): number;
    foo3(a: number): number;
    foo3(b: string): number;
    /** foo4 1*/
    foo4(a: number): number;
    foo4(b: string): number;
    /** foo4 any */
    foo4(c: any): any;
    /// new 1
    new (a: string);
    /** new 1*/
    new (b: number);
}
var i1_i: i1;
interface i2 {
    new (a: string);
    /** new 2*/
    new (b: number);
    (a: number): number;
    /**this is signature 2*/
    (b: string): number;
}
var i2_i: i2;
interface i3 {
    /** new 1*/
    new (a: string);
    /** new 2*/
    new (b: number);
    /**this is signature 1*/
    (a: number): number;
    (b: string): number;
}
var i3_i: i3;
interface i4 {
    new (a: string);
    new (b: number);
    (a: number): number;
    (b: string): number;
}
class c {
    public prop1(a: number): number;
    public prop1(b: string): number;
    public prop1(aorb: any) {
        return 10;
    }
    /** prop2 1*/
    public prop2(a: number): number;
    public prop2(b: string): number;
    public prop2(aorb: any) {
        return 10;
    }
    public prop3(a: number): number;
    /** prop3 2*/
    public prop3(b: string): number;
    public prop3(aorb: any) {
        return 10;
    }
    /** prop4 1*/
    public prop4(a: number): number;
    /** prop4 2*/
    public prop4(b: string): number;
    public prop4(aorb: any) {
        return 10;
    }
    /** prop5 1*/
    public prop5(a: number): number;
    /** prop5 2*/
    public prop5(b: string): number;
    /** Prop5 implementaion*/
    public prop5(aorb: any) {
        return 10;
    }
}
class c1 {
    constructor(a: number);
    constructor(b: string);
    constructor(aorb: any) {
    }
}
class c2 {
    /** c2 1*/
    constructor(a: number);
    // c2 2
    constructor(b: string);
    constructor(aorb: any) {
    }
}
class c3 {
    constructor(a: number);
    /** c3 2*/
    constructor(b: string);
    constructor(aorb: any) {
    }
}
class c4 {
    /** c4 1*/
    constructor(a: number);
    /** c4 2*/
    constructor(b: string);
    /** c4 3 */
    constructor(aorb: any) {
    }
}
class c5 {
    /** c5 1*/
    constructor(a: number);
    /** c5 2*/
    constructor(b: string);
    /** c5 implementation*/
    constructor(aorb: any) {
    }
}
var c_i = new c();

var c1_i_1 = new c1(10);
var c1_i_2 = new c1("hello");
var c2_i_1 = new c2(10);
var c2_i_2 = new c2("hello");
var c3_i_1 = new c3(10);
var c3_i_2 = new c3("hello");
var c4_i_1 = new c4(10);
var c4_i_2 = new c4("hello");
var c5_i_1 = new c5(10);
var c5_i_2 = new c5("hello");


//// [commentsOverloads.js]
function f1(aOrb) {
    return 10;
}
f1("hello");
f1(10);
/** this is f2 var comment*/
function f2(aOrb) {
    return 10;
}
f2("hello");
f2(10);
function f3(aOrb) {
    return 10;
}
f3("hello");
f3(10);
function f4(aOrb) {
    return 10;
}
f4("hello");
f4(10);
var i1_i;
var i2_i;
var i3_i;
var c = /** @class */ (function () {
    function c() {
    }
    c.prototype.prop1 = function (aorb) {
        return 10;
    };
    c.prototype.prop2 = function (aorb) {
        return 10;
    };
    c.prototype.prop3 = function (aorb) {
        return 10;
    };
    c.prototype.prop4 = function (aorb) {
        return 10;
    };
    /** Prop5 implementaion*/
    c.prototype.prop5 = function (aorb) {
        return 10;
    };
    return c;
}());
var c1 = /** @class */ (function () {
    function c1(aorb) {
    }
    return c1;
}());
var c2 = /** @class */ (function () {
    function c2(aorb) {
    }
    return c2;
}());
var c3 = /** @class */ (function () {
    function c3(aorb) {
    }
    return c3;
}());
var c4 = /** @class */ (function () {
    /** c4 3 */
    function c4(aorb) {
    }
    return c4;
}());
var c5 = /** @class */ (function () {
    /** c5 implementation*/
    function c5(aorb) {
    }
    return c5;
}());
var c_i = new c();
var c1_i_1 = new c1(10);
var c1_i_2 = new c1("hello");
var c2_i_1 = new c2(10);
var c2_i_2 = new c2("hello");
var c3_i_1 = new c3(10);
var c3_i_2 = new c3("hello");
var c4_i_1 = new c4(10);
var c4_i_2 = new c4("hello");
var c5_i_1 = new c5(10);
var c5_i_2 = new c5("hello");


//// [commentsOverloads.d.ts]
/** this is signature 1*/
declare function f1(/**param a*/ a: number): number;
declare function f1(b: string): number;
declare function f2(a: number): number;
/** this is signature 2*/
declare function f2(b: string): number;
declare function f3(a: number): number;
declare function f3(b: string): number;
/** this is signature 4 - with number parameter*/
declare function f4(/**param a*/ a: number): number;
/** this is signature 4 - with string parameter*/
declare function f4(b: string): number;
interface i1 {
    /**this signature 1*/
    (/**param a*/ a: number): number;
    /**this is signature 2*/
    (b: string): number;
    /** foo 1*/
    foo(a: number): number;
    /** foo 2*/
    foo(b: string): number;
    foo(arr: number[]): number;
    /** foo 4 */
    foo(arr: string[]): number;
    foo2(a: number): number;
    /** foo2 2*/
    foo2(b: string): number;
    foo3(a: number): number;
    foo3(b: string): number;
    /** foo4 1*/
    foo4(a: number): number;
    foo4(b: string): number;
    /** foo4 any */
    foo4(c: any): any;
    new (a: string): any;
    /** new 1*/
    new (b: number): any;
}
declare var i1_i: i1;
interface i2 {
    new (a: string): any;
    /** new 2*/
    new (b: number): any;
    (a: number): number;
    /**this is signature 2*/
    (b: string): number;
}
declare var i2_i: i2;
interface i3 {
    /** new 1*/
    new (a: string): any;
    /** new 2*/
    new (b: number): any;
    /**this is signature 1*/
    (a: number): number;
    (b: string): number;
}
declare var i3_i: i3;
interface i4 {
    new (a: string): any;
    new (b: number): any;
    (a: number): number;
    (b: string): number;
}
declare class c {
    prop1(a: number): number;
    prop1(b: string): number;
    /** prop2 1*/
    prop2(a: number): number;
    prop2(b: string): number;
    prop3(a: number): number;
    /** prop3 2*/
    prop3(b: string): number;
    /** prop4 1*/
    prop4(a: number): number;
    /** prop4 2*/
    prop4(b: string): number;
    /** prop5 1*/
    prop5(a: number): number;
    /** prop5 2*/
    prop5(b: string): number;
}
declare class c1 {
    constructor(a: number);
    constructor(b: string);
}
declare class c2 {
    /** c2 1*/
    constructor(a: number);
    constructor(b: string);
}
declare class c3 {
    constructor(a: number);
    /** c3 2*/
    constructor(b: string);
}
declare class c4 {
    /** c4 1*/
    constructor(a: number);
    /** c4 2*/
    constructor(b: string);
}
declare class c5 {
    /** c5 1*/
    constructor(a: number);
    /** c5 2*/
    constructor(b: string);
}
declare var c_i: c;
declare var c1_i_1: c1;
declare var c1_i_2: c1;
declare var c2_i_1: c2;
declare var c2_i_2: c2;
declare var c3_i_1: c3;
declare var c3_i_2: c3;
declare var c4_i_1: c4;
declare var c4_i_2: c4;
declare var c5_i_1: c5;
declare var c5_i_2: c5;
