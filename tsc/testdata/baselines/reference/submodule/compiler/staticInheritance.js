//// [tests/cases/compiler/staticInheritance.ts] ////

//// [staticInheritance.ts]
function doThing(x: { n: string }) { }
class A {
    static n: string;
    p = doThing(A); // OK
}
class B extends A {
    p1 = doThing(A); // OK
    p2 = doThing(B); // OK
}
doThing(B); //OK


//// [staticInheritance.js]
function doThing(x) { }
class A {
    static n;
    p = doThing(A);
}
class B extends A {
    p1 = doThing(A);
    p2 = doThing(B);
}
doThing(B);
