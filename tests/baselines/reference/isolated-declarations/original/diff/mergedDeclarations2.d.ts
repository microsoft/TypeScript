// [[Reason: ]] ////

//// [tests/cases/compiler/mergedDeclarations2.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -4,9 +4,9 @@
 declare enum Foo {
     b = 0
 }
 declare enum Foo {
-    a
+    a = 0
 }
 declare namespace Foo {
     var x: invalid;
 }
