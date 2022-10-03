//// [exportDefaultForNonInstantiatedModule.ts]
module m {
    export interface foo {
    }
}
// Should not be emitted
export default m;

//// [exportDefaultForNonInstantiatedModule.js]
export {};
