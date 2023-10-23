// [[Reason: ]] ////

//// [tests/cases/compiler/constEnumErrors.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -6,9 +6,9 @@
 }
 declare namespace E {
 }
 declare const enum E1 {
-    X,
+    X = 0,
     Y,
     Y1
 }
 declare const enum E2 {
