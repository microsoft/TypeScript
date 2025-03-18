//// [tests/cases/compiler/importDeclWithDeclareModifier.ts] ////

//// [importDeclWithDeclareModifier.ts]
module x {
    interface c {
    }
}
declare export import a = x.c;
var b: a;


//// [importDeclWithDeclareModifier.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b;
