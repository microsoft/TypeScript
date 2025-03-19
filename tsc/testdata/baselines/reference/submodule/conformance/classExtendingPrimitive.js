//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendingPrimitive.ts] ////

//// [classExtendingPrimitive.ts]
// classes cannot extend primitives

class C extends number { }
class C2 extends string { }
class C3 extends boolean { }
class C4 extends Void  { }
class C4a extends void {}
class C5 extends Null { }
class C5a extends null { }
class C6 extends undefined { }
class C7 extends Undefined { }

enum E { A }
class C8 extends E { }

//// [classExtendingPrimitive.js]
// classes cannot extend primitives
class C extends number {
}
class C2 extends string {
}
class C3 extends boolean {
}
class C4 extends Void {
}
class C4a extends  {
}
void {};
class C5 extends Null {
}
class C5a extends null {
}
class C6 extends undefined {
}
class C7 extends Undefined {
}
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
class C8 extends E {
}
