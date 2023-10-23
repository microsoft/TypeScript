// [[Reason: ]] ////

//// [tests/cases/conformance/internalModules/moduleDeclarations/reExportAliasMakesInstantiated.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -9,5 +9,9 @@
     import test1 = pack1.test1;
     export { test1 };
 }
 export import test1 = pack2.test1;
+declare namespace mod1 {
+    type test1 = string;
+    export { test1 };
+}
 export {};
