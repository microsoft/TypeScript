//// [intTypeCheck.ts]
interface i1 {
    //Property Signatures
    p;
    p1?;
    p2?: string;
    p3();
    p4? ();
    p5? (): void;
    p6(pa1): void;
    p7? (pa1, pa2): void;
}
interface i2 {
    //Call Signatures
    ();
    (): number;
    (p);
    (p1: string);
    (p2?: string);
    (...p3: any[]);
    (p4: string, p5?: string);
    (p6: string, ...p7: any[]);
}
interface i3 {
    //Construct Signatures
    new ();
    new (): number;
    new (p: string);
    new (p2?: string);
    new (...p3: any[]);
    new (p4: string, p5?: string);
    new (p6: string, ...p7: any[]);
}
interface i4 {
    // Used to be indexer, now it is a computed property
    [p];
    //Index Signatures
    [p1: string];
    [p2: string, p3: number];
}
interface i5 extends i1 { }
interface i6 extends i2 { }
interface i7 extends i3 { }
interface i8 extends i4 { }
interface i9 { }

class Base { foo() { } }

interface i11 {
    //Call Signatures
    ();
    (): number;
    (p);
    (p1: string);
    (p2?: string);
    (...p3: any[]);
    (p4: string, p5?: string);
    (p6: string, ...p7: any[]);
    //(p8?: string, ...p9: any[]);
    //(p10:string, p8?: string, ...p9: any[]);

    //Construct Signatures
    new ();
    new (): number;
    new (p: string);
    new (p2?: string);
    new (...p3: any[]);
    new (p4: string, p5?: string);
    new (p6: string, ...p7: any[]);
    
    // Used to be indexer, now it is a computed property
    [p];
    //Index Signatures
    [p1: string];
    [p2: string, p3: number];

    //Property Signatures
    p;
    p1?;
    p2?: string;
    p3();
    p4? ();
    p5? (): void;
    p6(pa1): void;
    p7(pa1, pa2): void;
    p7? (pa1, pa2): void;
}

var anyVar: any;
//
// Property signatures
//
var obj0: i1;
var obj1: i1 = {
    p: null,
    p3: function ():any { return 0; },
    p6: function (pa1):any { return 0; },
    p7: function (pa1, pa2):any { return 0; }
};
var obj2: i1 = new Object();
var obj3: i1 = new obj0;
var obj4: i1 = new Base;
var obj5: i1 = null;
var obj6: i1 = function () { };
//var obj7: i1 = function foo() { };
var obj8: i1 = <i1> anyVar;
var obj9: i1 = new <i1> anyVar;
var obj10: i1 = new {};
//
// Call signatures
//
var obj11: i2;
var obj12: i2 = {};
var obj13: i2 = new Object();
var obj14: i2 = new obj11;
var obj15: i2 = new Base;
var obj16: i2 = null;
var obj17: i2 = function ():any { return 0; };
//var obj18: i2 = function foo() { };
var obj19: i2 = <i2> anyVar;
var obj20: i2 = new <i2> anyVar;
var obj21: i2 = new {};
//
// Construct Signatures
//
var obj22: i3;
var obj23: i3 = {};
var obj24: i3 = new Object();
var obj25: i3 = new obj22;
var obj26: i3 = new Base;
var obj27: i3 = null;
var obj28: i3 = function () { };
//var obj29: i3 = function foo() { };
var obj30: i3 = <i3> anyVar;
var obj31: i3 = new <i3> anyVar;
var obj32: i3 = new {};
//
// Index Signatures
//
var obj33: i4;
var obj34: i4 = {};
var obj35: i4 = new Object();
var obj36: i4 = new obj33;
var obj37: i4 = new Base;
var obj38: i4 = null;
var obj39: i4 = function () { };
//var obj40: i4 = function foo() { };
var obj41: i4 = <i4> anyVar;
var obj42: i4 = new <i4> anyVar;
var obj43: i4 = new {};
//
// Interface Derived I1
//
var obj44: i5;
var obj45: i5 = {};
var obj46: i5 = new Object();
var obj47: i5 = new obj44;
var obj48: i5 = new Base;
var obj49: i5 = null;
var obj50: i5 = function () { };
//var obj51: i5 = function foo() { };
var obj52: i5 = <i5> anyVar;
var obj53: i5 = new <i5> anyVar;
var obj54: i5 = new {};
//
// Interface Derived I2
//
var obj55: i6;
var obj56: i6 = {};
var obj57: i6 = new Object();
var obj58: i6 = new obj55;
var obj59: i6 = new Base;
var obj60: i6 = null;
var obj61: i6 = function () { };
//var obj62: i6 = function foo() { };
var obj63: i6 = <i6> anyVar;
var obj64: i6 = new <i6> anyVar;
var obj65: i6 = new {};
//
// Interface Derived I3
//
var obj66: i7;
var obj67: i7 = {};
var obj68: i7 = new Object();
var obj69: i7 = new obj66;
var obj70: i7 = <i7>new Base;
var obj71: i7 = null;
var obj72: i7 = function () { };
//var obj73: i7 = function foo() { };
var obj74: i7 = <i7> anyVar;
var obj75: i7 = new <i7> anyVar;
var obj76: i7 = new {};
//
// Interface Derived I4
//
var obj77: i8;
var obj78: i8 = {};
var obj79: i8 = new Object();
var obj80: i8 = new obj77;
var obj81: i8 = new Base;
var obj82: i8 = null;
var obj83: i8 = function () { };
//var obj84: i8 = function foo() { };
var obj85: i8 = <i8> anyVar;
var obj86: i8 = new <i8> anyVar;
var obj87: i8 = new {};

//// [intTypeCheck.js]
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.foo = function () { };
    return Base;
}());
var anyVar;
//
// Property signatures
//
var obj0;
var obj1 = {
    p: null,
    p3: function () { return 0; },
    p6: function (pa1) { return 0; },
    p7: function (pa1, pa2) { return 0; }
};
var obj2 = new Object();
var obj3 = new obj0;
var obj4 = new Base;
var obj5 = null;
var obj6 = function () { };
//var obj7: i1 = function foo() { };
var obj8 = anyVar;
var obj9 = new  < i1 > anyVar;
var obj10 = new {};
//
// Call signatures
//
var obj11;
var obj12 = {};
var obj13 = new Object();
var obj14 = new obj11;
var obj15 = new Base;
var obj16 = null;
var obj17 = function () { return 0; };
//var obj18: i2 = function foo() { };
var obj19 = anyVar;
var obj20 = new  < i2 > anyVar;
var obj21 = new {};
//
// Construct Signatures
//
var obj22;
var obj23 = {};
var obj24 = new Object();
var obj25 = new obj22;
var obj26 = new Base;
var obj27 = null;
var obj28 = function () { };
//var obj29: i3 = function foo() { };
var obj30 = anyVar;
var obj31 = new  < i3 > anyVar;
var obj32 = new {};
//
// Index Signatures
//
var obj33;
var obj34 = {};
var obj35 = new Object();
var obj36 = new obj33;
var obj37 = new Base;
var obj38 = null;
var obj39 = function () { };
//var obj40: i4 = function foo() { };
var obj41 = anyVar;
var obj42 = new  < i4 > anyVar;
var obj43 = new {};
//
// Interface Derived I1
//
var obj44;
var obj45 = {};
var obj46 = new Object();
var obj47 = new obj44;
var obj48 = new Base;
var obj49 = null;
var obj50 = function () { };
//var obj51: i5 = function foo() { };
var obj52 = anyVar;
var obj53 = new  < i5 > anyVar;
var obj54 = new {};
//
// Interface Derived I2
//
var obj55;
var obj56 = {};
var obj57 = new Object();
var obj58 = new obj55;
var obj59 = new Base;
var obj60 = null;
var obj61 = function () { };
//var obj62: i6 = function foo() { };
var obj63 = anyVar;
var obj64 = new  < i6 > anyVar;
var obj65 = new {};
//
// Interface Derived I3
//
var obj66;
var obj67 = {};
var obj68 = new Object();
var obj69 = new obj66;
var obj70 = new Base;
var obj71 = null;
var obj72 = function () { };
//var obj73: i7 = function foo() { };
var obj74 = anyVar;
var obj75 = new  < i7 > anyVar;
var obj76 = new {};
//
// Interface Derived I4
//
var obj77;
var obj78 = {};
var obj79 = new Object();
var obj80 = new obj77;
var obj81 = new Base;
var obj82 = null;
var obj83 = function () { };
//var obj84: i8 = function foo() { };
var obj85 = anyVar;
var obj86 = new  < i8 > anyVar;
var obj87 = new {};
