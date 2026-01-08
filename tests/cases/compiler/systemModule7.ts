// @module: system

// filename: instantiatedModule.ts
export namespace M {
    var x = 1;
}

// filename: nonInstantiatedModule.ts
export namespace M {
    interface I {}
}