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
exports.a = void 0;
exports.a = x.c;
var b;
