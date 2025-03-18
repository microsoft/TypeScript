//// [tests/cases/compiler/moduleAugmentationGlobal6.ts] ////

//// [moduleAugmentationGlobal6.ts]
declare global {
    interface Array<T> { x }
}

//// [moduleAugmentationGlobal6.js]
