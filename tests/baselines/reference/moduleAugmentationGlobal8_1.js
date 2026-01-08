//// [tests/cases/compiler/moduleAugmentationGlobal8_1.ts] ////

//// [moduleAugmentationGlobal8_1.ts]
namespace A {
    global {
        interface Array<T> { x }
    }
}
export {}


//// [moduleAugmentationGlobal8_1.js]
export {};
