// [[Reason: ]] ////

//// [tests/cases/conformance/parser/ecmascript5/IndexSignatures/parserIndexSignature11.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -1,8 +1,7 @@
 
 
 //// [/.src/parserIndexSignature11.d.ts]
 interface I {
-    [p]: any;
     [p1: string]: any;
     [p2: string, p3: number]: any;
 }
