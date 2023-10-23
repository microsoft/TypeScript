// [[Reason: ]] ////

//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames6_ES6.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -3,9 +3,5 @@
 //// [/.src/computedPropertyNames6_ES6.d.ts]
 declare var p1: number | string;
 declare var p2: number | number[];
 declare var p3: string | boolean;
-declare var v: {
-    [p1]: number;
-    [p2]: number;
-    [p3]: number;
-};
+declare var v: invalid;
