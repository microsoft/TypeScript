//// [tests/cases/compiler/destructureComputedProperty.ts] ////

//// [destructureComputedProperty.ts]
declare const ab: { n: number } | { n: string };
const nameN = "n";
const { [nameN]: n } = ab;

class C { private p: number; }
const nameP = "p";
const { "p": p0 } = new C();
const { ["p"]: p1 } = new C();
const { [nameP]: p2 } = new C();
const { p: p3 } = new C();


//// [destructureComputedProperty.js]
const nameN = "n";
const { [nameN]: n } = ab;
class C {
    p;
}
const nameP = "p";
const { "p": p0 } = new C();
const { ["p"]: p1 } = new C();
const { [nameP]: p2 } = new C();
const { p: p3 } = new C();
