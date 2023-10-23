// [[Reason: ]] ////

//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxConstEnumUsage.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -1,10 +1,10 @@
 
 
 //// [/.src/bar.d.ts]
 export declare enum Bar {
-    a,
-    c,
+    a = 1,
+    c = 3,
     e = 5
 }
 
 //// [/.src/foo.d.ts]
