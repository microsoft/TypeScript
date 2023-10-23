// [[Reason: ]] ////

//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesOnOverloads_ES6.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -5,5 +5,6 @@
 declare var accessorName: string;
 declare class C {
     [methodName](v: string): invalid;
     [methodName](): invalid;
+    [methodName](v?: string): invalid;
 }
