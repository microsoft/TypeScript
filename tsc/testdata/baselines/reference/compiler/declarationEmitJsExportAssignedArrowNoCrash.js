//// [tests/cases/compiler/declarationEmitJsExportAssignedArrowNoCrash.ts] ////

//// [index.d.ts]
declare namespace Config {
  export {
    InitialOptions,
  };
}
export { Config };

declare interface ConfigGlobals {
  x: unknown;
}

declare type InitialOptions = {
  globals?: ConfigGlobals;
};
//// [repro.js]
/** @type {(x: import("@jest/types").Config.InitialOptions) => void} */
module.exports = (x) => {};



//// [repro.d.ts]
export = _exports;
/** @type {(x: import("@jest/types").Config.InitialOptions) => void} */
declare const _exports: (x: import("@jest/types").Config.InitialOptions) => void;
