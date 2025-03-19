//// [tests/cases/compiler/genericObjectLitReturnType.ts] ////

//// [genericObjectLitReturnType.ts]
class X<T>
{
    f(t: T) { return { a: t }; }
}

 
var x: X<number>;
var t1 = x.f(5);
t1.a = 5; // Should not error: t1 should have type {a: number}, instead has type {a: T}
 


//// [genericObjectLitReturnType.js]
class X {
    f(t) { return { a: t }; }
}
var x;
var t1 = x.f(5);
t1.a = 5; // Should not error: t1 should have type {a: number}, instead has type {a: T}
