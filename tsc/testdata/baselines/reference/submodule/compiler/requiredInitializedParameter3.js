//// [tests/cases/compiler/requiredInitializedParameter3.ts] ////

//// [requiredInitializedParameter3.ts]
interface I1 {
    method();
}

class C1 implements I1 {
    method(a = 0, b?) { }
}

//// [requiredInitializedParameter3.js]
class C1 {
    method(a = 0, b) { }
}
