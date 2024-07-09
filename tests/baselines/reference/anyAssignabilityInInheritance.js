//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/anyAssignabilityInInheritance.ts] ////

//// [anyAssignabilityInInheritance.ts]
// any is not a subtype of any other types, errors expected on all the below derived classes unless otherwise noted

interface I {
    [x: string]: any;
    foo: any; // ok, any identical to itself
}

var a: any;

declare function foo2(x: number): number;
declare function foo2(x: any): any;
var r3 = foo2(a); // any, not a subtype of number so it skips that overload, is a subtype of itself so it picks second (if truly ambiguous it would pick first overload)

declare function foo3(x: string): string;
declare function foo3(x: any): any;
var r3 = foo3(a); // any

declare function foo4(x: boolean): boolean;
declare function foo4(x: any): any;
var r3 = foo3(a); // any

declare function foo5(x: Date): Date;
declare function foo5(x: any): any;
var r3 = foo3(a); // any

declare function foo6(x: RegExp): RegExp;
declare function foo6(x: any): any;
var r3 = foo3(a); // any

declare function foo7(x: { bar: number }): { bar: number };
declare function foo7(x: any): any;
var r3 = foo3(a); // any

declare function foo8(x: number[]): number[];
declare function foo8(x: any): any;
var r3 = foo3(a); // any

interface I8 { foo: string }
declare function foo9(x: I8): I8;
declare function foo9(x: any): any;
var r3 = foo3(a); // any

class A { foo: number; }
declare function foo10(x: A): A;
declare function foo10(x: any): any;
var r3 = foo3(a); // any

class A2<T> { foo: T; }
declare function foo11(x: A2<string>): A2<string>;
declare function foo11(x: any): any;
var r3 = foo3(a); // any

declare function foo12(x: (x) => number): (x) => number;
declare function foo12(x: any): any;
var r3 = foo3(a); // any

declare function foo13(x: <T>(x: T) => T): <T>(x: T) => T;
declare function foo13(x: any): any;
var r3 = foo3(a); // any

enum E { A }
declare function foo14(x: E): E;
declare function foo14(x: any): any;
var r3 = foo3(a); // any

function f() { }
module f {
    export var bar = 1;
}
declare function foo15(x: typeof f): typeof f;
declare function foo15(x: any): any;
var r3 = foo3(a); // any

class CC { baz: string }
module CC {
    export var bar = 1;
}
declare function foo16(x: CC): CC;
declare function foo16(x: any): any;
var r3 = foo3(a); // any

declare function foo17(x: Object): Object;
declare function foo17(x: any): any;
var r3 = foo3(a); // any

declare function foo18(x: {}): {};
declare function foo18(x: any): any;
var r3 = foo3(a); // any

//// [anyAssignabilityInInheritance.js]
// any is not a subtype of any other types, errors expected on all the below derived classes unless otherwise noted
var a;
var r3 = foo2(a); // any, not a subtype of number so it skips that overload, is a subtype of itself so it picks second (if truly ambiguous it would pick first overload)
var r3 = foo3(a); // any
var r3 = foo3(a); // any
var r3 = foo3(a); // any
var r3 = foo3(a); // any
var r3 = foo3(a); // any
var r3 = foo3(a); // any
var r3 = foo3(a); // any
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var r3 = foo3(a); // any
var A2 = /** @class */ (function () {
    function A2() {
    }
    return A2;
}());
var r3 = foo3(a); // any
var r3 = foo3(a); // any
var r3 = foo3(a); // any
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var r3 = foo3(a); // any
function f() { }
(function (f) {
    f.bar = 1;
})(f || (f = {}));
var r3 = foo3(a); // any
var CC = /** @class */ (function () {
    function CC() {
    }
    return CC;
}());
(function (CC) {
    CC.bar = 1;
})(CC || (CC = {}));
var r3 = foo3(a); // any
var r3 = foo3(a); // any
var r3 = foo3(a); // any
