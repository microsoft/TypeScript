//// [tests/cases/compiler/jsTypedefMergedWithModuleExportProperty.ts] ////

//// [ModuleGraphConnection.js]
/** @typedef {typeof T} T */
const T = Symbol();
module.exports = class ModuleGraphConnection {};
module.exports.T = T;

//// [repro.js]
'use strict';
/** @typedef {import('./local-lib/ModuleGraphConnection')} ImportedType */
/** @type {ImportedType} */
module.exports = class Repro {};


//// [ModuleGraphConnection.js]
"use strict";
/** @typedef {typeof T} T */
const T = Symbol();
module.exports = class ModuleGraphConnection {
};
module.exports.T = T;
//// [repro.js]
'use strict';
/** @typedef {import('./local-lib/ModuleGraphConnection')} ImportedType */
/** @type {ImportedType} */
module.exports = class Repro {
};


//// [ModuleGraphConnection.d.ts]
export = ModuleGraphConnection;
declare class ModuleGraphConnection {
}
declare namespace ModuleGraphConnection {
    const _exported: typeof T;
    export { _exported as T };
}
export type T = typeof T;
/** @typedef {typeof T} T */
declare const T: unique symbol;
//// [repro.d.ts]
export = Repro;
/** @typedef {import('./local-lib/ModuleGraphConnection')} ImportedType */
/** @type {ImportedType} */
declare class Repro {
}
export type ImportedType = import('./local-lib/ModuleGraphConnection');
