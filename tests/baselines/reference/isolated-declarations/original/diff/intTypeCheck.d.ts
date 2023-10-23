// [[Reason: ]] ////

//// [tests/cases/compiler/intTypeCheck.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -30,9 +30,8 @@
     new (p4: string, p5?: string): any;
     new (p6: string, ...p7: any[]): any;
 }
 interface i4 {
-    [p]: any;
     [p1: string]: any;
     [p2: string, p3: number]: any;
 }
 interface i5 extends i1 {
@@ -63,9 +62,8 @@
     new (p2?: string): any;
     new (...p3: any[]): any;
     new (p4: string, p5?: string): any;
     new (p6: string, ...p7: any[]): any;
-    [p]: any;
     [p1: string]: any;
     [p2: string, p3: number]: any;
     p: any;
     p1?: any;
