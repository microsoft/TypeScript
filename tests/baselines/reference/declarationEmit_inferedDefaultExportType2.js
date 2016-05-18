//// [declarationEmit_inferedDefaultExportType2.ts]

// test.ts
export = {
  foo: [],
  bar: undefined,
  baz: null
}

//// [declarationEmit_inferedDefaultExportType2.js]
"use strict";
module.exports = {
    foo: [],
    bar: undefined,
    baz: null
};


//// [declarationEmit_inferedDefaultExportType2.d.ts]
declare var _default: {
    foo: any[];
    bar: any;
    baz: any;
};
export = _default;
