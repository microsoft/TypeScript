// [[Reason: ]] ////

//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit12.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -5,9 +5,8 @@
     interface I {
     }
     export class C {
         [Symbol.iterator]: I;
-        [Symbol.toPrimitive](x: I): invalid;
         [Symbol.isConcatSpreadable](): I;
         get [Symbol.toPrimitive](): invalid;
         set [Symbol.toPrimitive](x: I);
     }
