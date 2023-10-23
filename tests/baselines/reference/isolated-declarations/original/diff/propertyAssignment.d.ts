// [[Reason: ]] ////

//// [tests/cases/compiler/propertyAssignment.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -6,11 +6,9 @@
 };
 declare var bar1: {
     x: number;
 };
-declare var foo2: {
-    [index]: any;
-};
+declare var foo2: {};
 declare var bar2: {
     x: number;
 };
 declare var foo3: {
