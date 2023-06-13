//// [tests/cases/compiler/moduleAugmentationGlobal6_1.ts] ////

//// [moduleAugmentationGlobal6_1.ts]
global {
    interface Array<T> { x }
}

//// [moduleAugmentationGlobal6_1.js]
