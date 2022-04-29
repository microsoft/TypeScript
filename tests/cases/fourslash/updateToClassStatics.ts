/// <reference path="fourslash.ts" />

//// module TypeScript {
////     export class PullSymbol {}
////     export class Diagnostic {}
////     export class SymbolAndDiagnostics<TSymbol extends PullSymbol> {
////         constructor(public symbol: TSymbol,
////             public diagnostics: Diagnostic) {
////         }
////         /**/
////         public static create<TSymbol extends PullSymbol>(symbol: TSymbol, diagnostics: Diagnostic): SymbolAndDiagnostics<TSymbol> {
////             return new SymbolAndDiagnostics<TSymbol>(symbol, diagnostics);
////         }
////     }
//// }
//// module TypeScript {
////     var x : TypeScript.SymbolAndDiagnostics;
//// }

goTo.marker();
// We've had some invalidation errors where adding a member to a generic type with statics could cause a crash to occur
edit.insert("someNewProperty = 0;");
