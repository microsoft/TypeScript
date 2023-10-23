// [[Reason: ]] ////

//// [tests/cases/compiler/bigintIndex.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -14,7 +14,5 @@
 declare const a: {};
 declare const b: {
     [1n]: number;
 };
-declare const c: {
-    [bigNum]: number;
-};
+declare const c: invalid;
