//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendingPrimitive2.ts] ////

//// [classExtendingPrimitive2.ts]
// classes cannot extend primitives

class C4a extends void {}
class C5a extends null { }

//// [classExtendingPrimitive2.js]
class C4a extends  {
}
void {};
class C5a extends null {
}
