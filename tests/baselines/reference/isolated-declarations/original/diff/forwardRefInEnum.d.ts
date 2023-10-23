// [[Reason: ]] ////

//// [tests/cases/compiler/forwardRefInEnum.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -1,12 +1,12 @@
 
 
 //// [/.src/forwardRefInEnum.d.ts]
 declare enum E1 {
-    X,
-    X1,
-    Y,
-    Y1
+    X = 0,
+    X1 = 0,
+    Y = 0,
+    Y1 = 0
 }
 declare enum E1 {
     Z = 4
 }
