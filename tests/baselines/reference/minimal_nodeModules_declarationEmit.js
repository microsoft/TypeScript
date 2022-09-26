//// [tests/cases/conformance/moduleResolution/minimal_nodeModules_declarationEmit.ts] ////

//// [module.d.ts]
export declare class SomeExportedClass {
  private foo: any;
}

declare global {
  function returnsPrivateClassOhNo(): SomeExportedClass;
}

//// [main.ts]
export const boom = returnsPrivateClassOhNo();


//// [main.js]
"use strict";
exports.__esModule = true;
exports.boom = void 0;
exports.boom = returnsPrivateClassOhNo();
