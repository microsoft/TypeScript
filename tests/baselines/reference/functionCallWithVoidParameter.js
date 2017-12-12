//// [functionCallWithVoidParameter.ts]
function f1(a: number, b: void) { }
function f2(a: void) { }
function f3(a: void, b: number) { }
function f4(a: number | void) { }
function f5(a: number | void, b: void) { }
function f6(a: number | void, b: number | void) { }
function f7(a: void, b: number | void) { }
function f8(a: void, b: void) { }
function f9<T, U>(a: T, b: U) {}

f1(1);
f1(1, void 0);
f2();
f2(void 0);
f3(void 0, 1);
f4();
f4(1);
f4(void 0);
f5();
f5(1);
f5(1, void 0);
f5(void 0, void 0);
f5(void 0);
f6();
f6(1);
f6(void 0);
f6(1, 1);
f6(1, void 0);
f6(void 0, void 0);
f6(void 0, 1);
f7();
f7(void 0);
f7(void 0, 1);
f7(void 0, void 0);
f8();
f8(void 0);
f8(void 0, void 0);

class X<T>
{
    f(t: T) { return { a: t }; }
}

var x2: X<void>; 
const t2b = x2.f();
t2b.a = void 0;


//// [functionCallWithVoidParameter.js]
function f1(a, b) { }
function f2(a) { }
function f3(a, b) { }
function f4(a) { }
function f5(a, b) { }
function f6(a, b) { }
function f7(a, b) { }
function f8(a, b) { }
function f9(a, b) { }
f1(1);
f1(1, void 0);
f2();
f2(void 0);
f3(void 0, 1);
f4();
f4(1);
f4(void 0);
f5();
f5(1);
f5(1, void 0);
f5(void 0, void 0);
f5(void 0);
f6();
f6(1);
f6(void 0);
f6(1, 1);
f6(1, void 0);
f6(void 0, void 0);
f6(void 0, 1);
f7();
f7(void 0);
f7(void 0, 1);
f7(void 0, void 0);
f8();
f8(void 0);
f8(void 0, void 0);
var X = /** @class */ (function () {
    function X() {
    }
    X.prototype.f = function (t) { return { a: t }; };
    return X;
}());
var x2;
var t2b = x2.f();
t2b.a = void 0;
