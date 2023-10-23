// [[Reason: ]] ////

//// [tests/cases/compiler/enumBasics3.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -11,9 +11,9 @@
 }
 declare namespace M {
     namespace N {
         enum E2 {
-            b,
+            b = 1,
             c
         }
     }
 }
