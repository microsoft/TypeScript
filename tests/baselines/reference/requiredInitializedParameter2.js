//// [tests/cases/compiler/requiredInitializedParameter2.ts] ////

//// [requiredInitializedParameter2.ts]
interface I1 {
    method();
}

class C1 implements I1 {
    method(a = 0, b) { }
}

//// [requiredInitializedParameter2.js]
class C1 {
    method(a = 0, b) { }
}
