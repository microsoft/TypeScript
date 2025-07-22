//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsKeywordExport1.ts] ////

//// [source.js]
// https://github.com/microsoft/TypeScript/issues/62081

const _null = {}
const $void = {}

export { _null as null, $void as void }


//// [source.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/62081
Object.defineProperty(exports, "__esModule", { value: true });
exports.void = exports.null = void 0;
var _null = {};
exports.null = _null;
var $void = {};
exports.void = $void;


//// [source.d.ts]
declare const _null: {};
declare const $void: {};
export { _null as null, $void as void };
