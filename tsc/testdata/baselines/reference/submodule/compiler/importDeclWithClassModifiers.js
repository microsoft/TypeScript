//// [tests/cases/compiler/importDeclWithClassModifiers.ts] ////

//// [importDeclWithClassModifiers.ts]
module x {
    interface c {
    }
}
export public import a = x.c;
export private import b = x.c;
export static import c = x.c;
var b: a;


//// [importDeclWithClassModifiers.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b;
