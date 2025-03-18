//// [tests/cases/compiler/moduleAsBaseType.ts] ////

//// [moduleAsBaseType.ts]
module M {}
class C extends M {}
interface I extends M { }
class C2 implements M { }

//// [moduleAsBaseType.js]
class C extends M {
}
class C2 {
}
