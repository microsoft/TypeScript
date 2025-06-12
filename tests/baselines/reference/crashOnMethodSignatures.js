//// [tests/cases/compiler/crashOnMethodSignatures.ts] ////

//// [crashOnMethodSignatures.ts]
class A {
    a(completed: () => any): void;
}


//// [crashOnMethodSignatures.js]
class A {
}
