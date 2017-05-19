//// [declarationEmitInferedDefaultExportType.ts]
// test.ts
export default {
  foo: [],
  bar: undefined,
  baz: null
}

//// [declarationEmitInferedDefaultExportType.js]
"use strict";
exports.__esModule = true;
// test.ts
exports["default"] = {
    foo: [],
    bar: undefined,
    baz: null
};


//// [declarationEmitInferedDefaultExportType.d.ts]
declare const _default: {
    foo: any[];
    bar: any;
    baz: any;
};
export default _default;
