// [[Reason: ]] ////

//// [tests/cases/conformance/es6/Symbols/symbolProperty58.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -3,7 +3,5 @@
 //// [/.src/symbolProperty58.d.ts]
 interface SymbolConstructor {
     foo: string;
 }
-declare var obj: {
-    [Symbol.foo]: number;
-};
+declare var obj: invalid;
