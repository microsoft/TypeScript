//// [declarationEmitInferedDefaultExportType.ts]

// test.ts
export default {
  foo: [],
  bar: undefined,
  baz: null
}

//// [declarationEmitInferedDefaultExportType.js]
"use strict";
// test.ts
exports["default"] = {
    foo: [],
    bar: undefined,
    baz: null
};
exports.__esModule = true;


//// [declarationEmitInferedDefaultExportType.d.ts]
declare var _default: {
    foo: any[];
    bar: any;
    baz: any;
};
export default _default;
