//// [tests/cases/conformance/classes/members/privateNames/privateNamesUnique-4.ts] ////

//// [privateNamesUnique-4.ts]
class A1 { }
interface A2 extends A1 { }
declare const a: A2;

class C { #something: number }
const c: C = a;


//// [privateNamesUnique-4.js]
class A1 {
}
class C {
    #something;
}
const c = a;
