// [[Reason: ]] ////

//// [tests/cases/conformance/enums/enumConstantMembers.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -22,17 +22,17 @@
     a = Infinity,
     b = Infinity,
     c = Infinity,
     d = NaN,
-    e,
-    f,
-    g
+    e = NaN,
+    f = Infinity,
+    g = -Infinity
 }
 declare const enum E6 {
     a = Infinity,
     b = Infinity,
     c = Infinity,
     d = NaN,
-    e,
-    f,
-    g
+    e = NaN,
+    f = Infinity,
+    g = -Infinity
 }
