// [[Reason: ]] ////

//// [tests/cases/compiler/enumBasics2.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -9,8 +9,8 @@
     z
 }
 declare enum Bar {
     a,// ok
-    b,// ok
+    b = 2,// ok
     c,// ok
     d
 }
