//// [tests/cases/compiler/importDeclWithExportModifier.ts] ////

//// [importDeclWithExportModifier.ts]
module x {
    interface c {
    }
}
export import a = x.c;
var b: a;


//// [importDeclWithExportModifier.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b;
