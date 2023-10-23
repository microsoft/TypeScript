// [[Reason: ]] ////

//// [tests/cases/compiler/overloadsWithComputedNames.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -19,18 +19,19 @@
     [uniqueSym2](): void;
     [uniqueSym](): void;
 }
 interface I1 {
-    [sym](): void;
     [uniqueSym2](): void;
     [uniqueSym](): void;
     [uniqueSym](): void;
 }
 declare class C2 {
     [strUnion](): void;
+    [strUnion](): invalid;
 }
 declare class I2 {
     [strUnion](): void;
+    [strUnion](): invalid;
 }
 declare class C3 {
     [1](): void;
     [2](): void;
