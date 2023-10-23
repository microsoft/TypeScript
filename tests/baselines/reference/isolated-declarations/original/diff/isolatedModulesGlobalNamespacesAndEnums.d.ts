// [[Reason: ]] ////

//// [tests/cases/compiler/isolatedModulesGlobalNamespacesAndEnums.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -12,15 +12,15 @@
 declare const d = "d";
 
 //// [/.src/enum2.d.ts]
 declare enum Enum {
-    D,
-    E,// error
-    Y,// error
-    Z
+    D = "d",
+    E = 0,// error
+    Y = 1000000,// error
+    Z = 0
 }
 declare enum Enum {
-    F
+    F = 0
 }
 
 //// [/.src/module-namespaces.d.ts]
 export declare namespace Instantiated {
