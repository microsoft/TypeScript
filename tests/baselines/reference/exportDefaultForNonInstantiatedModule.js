//// [tests/cases/compiler/exportDefaultForNonInstantiatedModule.ts] ////

//// [exportDefaultForNonInstantiatedModule.ts]
namespace m {
    export interface foo {
    }
}
// Should not be emitted
export default m;

//// [exportDefaultForNonInstantiatedModule.js]
export {};
