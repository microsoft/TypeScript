// [[Reason: ]] ////

//// [tests/cases/compiler/indexSignatureMustHaveTypeAnnotation.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -1,9 +1,8 @@
 
 
 //// [/.src/indexSignatureMustHaveTypeAnnotation.d.ts]
 interface I {
-    [x]: string;
     [x: string]: any;
 }
 declare class C {
     [x]: string;
