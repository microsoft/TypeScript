//// [tests/cases/compiler/requiredInitializedParameter4.ts] ////

//// [requiredInitializedParameter4.ts]
class C1 {
    method(a = 0, b) { }
}

//// [requiredInitializedParameter4.js]
class C1 {
    method(a = 0, b) { }
}


//// [requiredInitializedParameter4.d.ts]
declare class C1 {
    method(a: number, b: any): void;
}
