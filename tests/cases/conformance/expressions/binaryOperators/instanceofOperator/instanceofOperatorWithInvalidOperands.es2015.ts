// @target: es2015
// @lib: es2015
class C {
    foo() { }
}

var x: any;

// invalid left operand
// the left operand is required to be of type Any, an object type, or a type parameter type
var a1: number;
var a2: boolean;
var a3: string;
var a4: void;

var ra1 = a1 instanceof x;
var ra2 = a2 instanceof x;
var ra3 = a3 instanceof x;
var ra4 = a4 instanceof x;
var ra5 = 0 instanceof x;
var ra6 = true instanceof x;
var ra7 = '' instanceof x;
var ra8 = null instanceof x;
var ra9 = undefined instanceof x;

// invalid right operand
// the right operand to be of type Any or a subtype of the 'Function' interface type
var b1: number;
var b2: boolean;
var b3: string;
var b4: void;
var o1: {};
var o2: Object;
var o3: C;

var rb1 = x instanceof b1;
var rb2 = x instanceof b2;
var rb3 = x instanceof b3;
var rb4 = x instanceof b4;
var rb5 = x instanceof 0;
var rb6 = x instanceof true;
var rb7 = x instanceof '';
var rb8 = x instanceof o1;
var rb9 = x instanceof o2;
var rb10 = x instanceof o3;

// both operands are invalid
var rc1 = '' instanceof {};

// @@hasInstance restricts LHS
var o4: {[Symbol.hasInstance](value: { x: number }): boolean;};
var o5: { y: string };
var ra10 = o5 instanceof o4;

// invalid @@hasInstance method return type on RHS
var o6: {[Symbol.hasInstance](value: unknown): number;};
var rb11 = x instanceof o6;