//// [tests/cases/conformance/externalModules/multipleExportDefault5.ts] ////

//// [multipleExportDefault5.ts]
export default function bar() { }
export default class C {}

//// [multipleExportDefault5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bar;
function bar() { }
class C {
}
exports.default = C;
