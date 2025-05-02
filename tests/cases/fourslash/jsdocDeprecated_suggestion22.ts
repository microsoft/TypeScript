/// <reference path="fourslash.ts" />

// @filename: /a.ts
////const foo: {
////    /**
////	 * @deprecated
////	 */
////	(a: string, b: string): string;
////	(a: string, b: number): string;
////} = (a: string, b: string | number) => a + b;
////
////[|foo|](1, 1);

verify.getSuggestionDiagnostics([]);
