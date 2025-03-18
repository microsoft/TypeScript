//// [tests/cases/compiler/moduleAugmentationGlobal7_1.ts] ////

//// [moduleAugmentationGlobal7_1.ts]
namespace A {
    global {
        interface Array<T> { x }
    }
}

//// [moduleAugmentationGlobal7_1.js]
