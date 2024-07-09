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
exports.a = void 0;
exports.a = x.c;
var b;


!!!! File importDeclWithDeclareModifier.js differs from original emit in noCheck emit
//// [importDeclWithDeclareModifier.js]
===================================================================
--- Expected	The full check baseline
+++ Actual	with noCheck set
@@ -1,5 +1,3 @@
 "use strict";
 Object.defineProperty(exports, "__esModule", { value: true });
-exports.a = void 0;
-exports.a = x.c;
 var b;
