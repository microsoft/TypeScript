// [[Reason: ]] ////

//// [tests/cases/compiler/computedPropertiesNarrowed.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -1,11 +1,8 @@
 
 
 //// [/.src/computedPropertiesNarrowed.d.ts]
-declare const x: 0 | 1;
-export declare let o: {
-    [x]: number;
-};
+export declare let o: invalid;
 declare const y: 0;
 export declare let o2: {
     [y]: number;
 };
@@ -15,12 +12,9 @@
 export declare let o31: {
     [-1]: number;
 };
 export declare let o32: invalid;
-declare let u: invalid;
-export declare let o4: {
-    [u]: number;
-};
+export declare let o4: invalid;
 export declare let o5: invalid;
 declare const uu: unique symbol;
 export declare let o6: {
     [uu]: number;
