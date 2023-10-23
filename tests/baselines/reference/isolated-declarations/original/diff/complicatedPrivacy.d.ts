// [[Reason: ]] ////

//// [tests/cases/compiler/complicatedPrivacy.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -17,11 +17,9 @@
     }): invalid;
     export function f3(): {
         (a: number): C1;
     };
-    export function f4(arg1: {
-        [number]: C1;
-    }): invalid;
+    export function f4(arg1: {}): invalid;
     export function f5(arg2: {
         new (arg1: C1): C1;
     }): invalid;
     namespace m3 {
