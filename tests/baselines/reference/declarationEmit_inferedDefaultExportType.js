//// [declarationEmit_inferedDefaultExportType.ts]

// test.ts
export default {
  foo: [],
  bar: undefined,
  baz: null
}

//// [declarationEmit_inferedDefaultExportType.js]
"use strict";
exports.__esModule = true;
exports["default"] = {
    foo: [],
    bar: undefined,
    baz: null
};


//// [declarationEmit_inferedDefaultExportType.d.ts]
declare var _default: {
    foo: any[];
    bar: any;
    baz: any;
};
export default _default;
