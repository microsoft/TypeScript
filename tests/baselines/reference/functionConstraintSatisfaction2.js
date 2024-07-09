//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/functionConstraintSatisfaction2.ts] ////

//// [functionConstraintSatisfaction2.ts]
// satisfaction of a constraint to Function, all of these invocations are errors unless otherwise noted

function foo<T extends Function>(x: T): T { return x; }

foo(1);
foo(() => { }, 1);
foo(1, () => { });

function foo2<T extends (x: string) => string>(x: T): T { return x; }

class C {
    foo: string;
}

var b: { new (x: string): string };

class C2<T> {
    foo: T;
}

var b2: { new <T>(x: T): T };

var r = foo2(new Function());
var r2 = foo2((x: string[]) => x);
var r6 = foo2(C);
var r7 = foo2(b);
var r8 = foo2(<U>(x: U) => x); // no error expected
var r11 = foo2(<U, V>(x: U, y: V) => x);
var r13 = foo2(C2);
var r14 = foo2(b2);

interface F2 extends Function { foo: string; }
var f2: F2;
var r16 = foo2(f2);

function fff<T extends { (): void }, U extends T>(x: T, y: U) {
    foo2(x);
    foo2(y);
}


//// [functionConstraintSatisfaction2.js]
// satisfaction of a constraint to Function, all of these invocations are errors unless otherwise noted
function foo(x) { return x; }
foo(1);
foo(function () { }, 1);
foo(1, function () { });
function foo2(x) { return x; }
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var b;
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var b2;
var r = foo2(new Function());
var r2 = foo2(function (x) { return x; });
var r6 = foo2(C);
var r7 = foo2(b);
var r8 = foo2(function (x) { return x; }); // no error expected
var r11 = foo2(function (x, y) { return x; });
var r13 = foo2(C2);
var r14 = foo2(b2);
var f2;
var r16 = foo2(f2);
function fff(x, y) {
    foo2(x);
    foo2(y);
}
