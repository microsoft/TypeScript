// [[Reason: ]] ////

//// [tests/cases/conformance/enums/enumErrors.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -16,10 +16,10 @@
     A = 0,
     B = 0
 }
 declare enum E10 {
-    A,
-    B
+    A = 0,
+    B = 0
 }
 declare enum E11 {
     A,
     B,
