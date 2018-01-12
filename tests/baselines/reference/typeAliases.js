//// [typeAliases.ts]
// Writing a reference to a type alias has exactly the same effect as writing the aliased type itself.

type T1 = number;
var x1: number;
var x1: T1;

type T2 = string;
var x2: string;
var x2: T2;

type T3 = boolean;
var x3: boolean;
var x3: T3;

type T4 = void;
var x4: void;
var x4: T4;

type T5 = any;
var x5: any;
var x5: T5;

interface I6 { x : string }
type T6 = I6;
var x6: I6;
var x6: T6;

class C7 { x: boolean }
type T7 = C7;
var x7: C7;
var x7: T7;

type T8 = string | boolean;
var x8: string | boolean;
var x8: T8;

type T9 = () => string;
var x9: () => string;
var x9: T9;

type T10 = { x: number };
var x10: { x: number };
var x10: T10;

type T11 = { new(): boolean };
var x11: { new(): boolean };
var x11: T11;

interface I13 { x: string };
type T13 = I13;
var x13_1: I13;
var x13_2: T13

declare function foo13<T1 extends I13, T2 extends T13>(t1: T1, t2: T13): void;
foo13(x13_1, x13_2);
foo13(x13_2, x13_1);

type T14 = string;
var x14: T14;

declare function foo14_1(x: T14): void;

declare function foo14_2(x: "click"): void;
declare function foo14_2(x: T14): void;

type Meters = number

enum E { x = 10 }

declare function f15(a: string): boolean;
declare function f15(a: Meters): string;
f15(E.x).toLowerCase();

type StringAndBoolean = [string, boolean]
declare function f16(s: StringAndBoolean): string;
var x: [string, boolean];
f16(x);

var y: StringAndBoolean = ["1", false];
y[0].toLowerCase();

//// [typeAliases.js]
// Writing a reference to a type alias has exactly the same effect as writing the aliased type itself.
var x1;
var x1;
var x2;
var x2;
var x3;
var x3;
var x4;
var x4;
var x5;
var x5;
var x6;
var x6;
var C7 = /** @class */ (function () {
    function C7() {
    }
    return C7;
}());
var x7;
var x7;
var x8;
var x8;
var x9;
var x9;
var x10;
var x10;
var x11;
var x11;
;
var x13_1;
var x13_2;
foo13(x13_1, x13_2);
foo13(x13_2, x13_1);
var x14;
var E;
(function (E) {
    E[E["x"] = 10] = "x";
})(E || (E = {}));
f15(E.x).toLowerCase();
var x;
f16(x);
var y = ["1", false];
y[0].toLowerCase();
