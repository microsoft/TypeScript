//// [tests/cases/compiler/classImplementsPrimitive.ts] ////

//// [classImplementsPrimitive.ts]
// classes cannot implement primitives

class C implements number { }
class C2 implements string { }
class C3 implements boolean { }

//// [classImplementsPrimitive.js]
// classes cannot implement primitives
class C {
}
class C2 {
}
class C3 {
}
