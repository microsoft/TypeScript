//// [tests/cases/compiler/importDeclWithDeclareModifier.ts] ////

//// [importDeclWithDeclareModifier.ts]
namespace x {
    interface c {
    }
}
declare export import a = x.c;
var b: a;


//// [importDeclWithDeclareModifier.js]
export var a = x.c;
var b;


!!!! File importDeclWithDeclareModifier.js differs from original emit in noCheck emit
//// [importDeclWithDeclareModifier.js]
===================================================================
--- Expected	The full check baseline
+++ Actual	with noCheck set
@@ -1,2 +1,2 @@
-export var a = x.c;
 var b;
+export {};
