//// [tests/cases/conformance/classes/classDeclarations/classExtendingBuiltinType.ts] ////

//// [classExtendingBuiltinType.ts]
class C1 extends Object { }
class C2 extends Function { }
class C3 extends String { }
class C4 extends Boolean { }
class C5 extends Number { }
class C6 extends Date { }
class C7 extends RegExp { }
class C8 extends Error { }
class C9 extends Array { }
class C10 extends Array<number> { }


//// [classExtendingBuiltinType.js]
class C1 extends Object {
}
class C2 extends Function {
}
class C3 extends String {
}
class C4 extends Boolean {
}
class C5 extends Number {
}
class C6 extends Date {
}
class C7 extends RegExp {
}
class C8 extends Error {
}
class C9 extends Array {
}
class C10 extends Array {
}
