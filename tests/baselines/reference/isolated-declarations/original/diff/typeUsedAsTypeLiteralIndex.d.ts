// [[Reason: ]] ////

//// [tests/cases/compiler/typeUsedAsTypeLiteralIndex.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -1,24 +1,17 @@
 
 
 //// [/.src/typeUsedAsTypeLiteralIndex.d.ts]
 type K = number | string;
-type T = {
-    [K]: number;
-};
+type T = {};
 declare const K1: invalid;
 type T1 = {
     [K1]: number;
 };
 type K2 = "x" | "y";
-type T2 = {
-    [K2]: number;
-};
+type T2 = {};
 type K3 = number | string;
-type T3 = {
-    [K3]: number;
-};
+type T3 = {};
 type K4 = number | string;
 type T4 = {
-    [K4]: number;
     k4: string;
 };
