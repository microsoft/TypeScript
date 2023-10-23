// [[Reason: ]] ////

//// [tests/cases/conformance/Symbols/ES5SymbolProperty1.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -4,7 +4,5 @@
 interface SymbolConstructor {
     foo: string;
 }
 declare var Symbol: SymbolConstructor;
-declare var obj: {
-    [Symbol.foo]: number;
-};
+declare var obj: invalid;
