//// [tests/cases/conformance/internalModules/moduleDeclarations/reExportAliasMakesInstantiated.ts] ////

//// [reExportAliasMakesInstantiated.ts]
declare module pack1 {
  const test1: string;
  export { test1 };
}
declare module pack2 {
  import test1 = pack1.test1;
  export { test1 };
}
export import test1 = pack2.test1;

declare module mod1 {
  type test1 = string;
  export { test1 };
}
declare module mod2 {
  import test1 = mod1.test1;
  export { test1 };
}
const test2 = mod2; // Possible false positive instantiation, but ok


//// [reExportAliasMakesInstantiated.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test1 = void 0;
exports.test1 = pack2.test1;
var test2 = mod2; // Possible false positive instantiation, but ok
