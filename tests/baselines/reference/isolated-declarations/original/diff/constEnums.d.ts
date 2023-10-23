// [[Reason: ]] ////

//// [tests/cases/compiler/constEnums.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -28,11 +28,11 @@
     T = 11,
     U = 11,
     V = 11,
     W = 11,
-    W1,
-    W2,
-    W3,
+    W1 = 100,
+    W2 = 100,
+    W3 = 100,
     W4 = 11,
     W5 = 11
 }
 declare const enum Comments {
@@ -48,19 +48,19 @@
     namespace B {
         namespace C {
             const enum E {
                 V1 = 1,
-                V2
+                V2 = 101
             }
         }
     }
 }
 declare namespace A {
     namespace B {
         namespace C {
             const enum E {
-                V3,
-                V4
+                V3 = 64,
+                V4 = 2
             }
         }
     }
 }
